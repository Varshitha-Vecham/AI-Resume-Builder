import "dotenv/config";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Add it to your .env file before starting the server.");
  process.exit(1);
}

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:5173");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    return response.sendStatus(204);
  }

  next();
});
app.use(express.json());

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

// Store account documents in the existing Atlas collection shown as "Project".
const User = mongoose.model("User", userSchema, "Project");

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function passwordMatches(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");
  if (!salt || !storedHash) return false;

  const suppliedHash = scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(suppliedHash, "hex"), Buffer.from(storedHash, "hex"));
}

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/auth/register", async (request, response) => {
  const name = typeof request.body.name === "string" ? request.body.name.trim() : "";
  const email = typeof request.body.email === "string" ? request.body.email.trim().toLowerCase() : "";
  const password = typeof request.body.password === "string" ? request.body.password : "";

  if (name.length < 2) return response.status(400).json({ message: "Name must be at least 2 characters." });
  if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ message: "Enter a valid email address." });
  if (password.length < 6) return response.status(400).json({ message: "Password must be at least 6 characters." });

  try {
    const existingUser = await User.exists({ email });
    if (existingUser) return response.status(409).json({ message: "An account with this email already exists." });

    const user = await User.create({ name, email, passwordHash: hashPassword(password) });
    return response.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    if (error?.code === 11000) return response.status(409).json({ message: "An account with this email already exists." });
    console.error("Registration failed:", error.message);
    return response.status(500).json({ message: "Could not create the account. Please try again." });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const email = typeof request.body.email === "string" ? request.body.email.trim().toLowerCase() : "";
  const password = typeof request.body.password === "string" ? request.body.password : "";

  try {
    const user = await User.findOne({ email });
    if (!user || !passwordMatches(password, user.passwordHash)) {
      return response.status(401).json({ message: "Incorrect email or password." });
    }
    return response.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login failed:", error.message);
    return response.status(500).json({ message: "Could not log in. Please try again." });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 12000,
      connectTimeoutMS: 12000,
      socketTimeoutMS: 12000,
    });

    console.log("Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
