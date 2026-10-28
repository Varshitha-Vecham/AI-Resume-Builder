import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthVisual from "./AuthVisual.jsx";

const registerFields = [
  ["name", "Full Name", "text", "Enter your full name", "name"],
  ["email", "Email Address", "email", "Enter your email", "email"],
  ["password", "Password", "password", "Create a password", "new-password"],
  ["confirmPassword", "Confirm Password", "password", "Confirm your password", "new-password"],
];

const loginFields = [
  ["email", "Email Address", "email", "Enter your email", "email"],
  ["password", "Password", "password", "Enter your password", "current-password"],
];

export default function AuthPage({ isRegister = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState({});
  const fields = isRegister ? registerFields : loginFields;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setMessage("");
  }

  function validate() {
    const nextErrors = {};

    if (isRegister && form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (isRegister && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    } else if (!isRegister && !form.password) {
      nextErrors.password = "Please enter your password.";
    }
    if (isRegister && !form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (isRegister && form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const email = form.email.trim().toLowerCase();

    if (isRegister) {
      if (users.some((user) => user.email === email)) {
        setErrors({ email: "An account with this email already exists." });
        return;
      }

      users.push({ name: form.name.trim(), email, password: form.password });
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login", { state: { registered: true } });
      return;
    }

    const user = users.find(
      (savedUser) => savedUser.email === email && savedUser.password === form.password
    );
    if (!user) {
      setMessage("Incorrect email or password. Please try again.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: user.name, email: user.email })
    );
    navigate("/home");
  }

  const togglePassword = (name) =>
    setVisible({ ...visible, [name]: !visible[name] });

  return (
    <main className="auth-page">
      <div className={`auth-shell ${isRegister ? "" : "auth-shell-reverse"}`}>
        <AuthVisual
          title={isRegister ? "Build Your Dream Career" : "Your Next Opportunity Awaits"}
          text={
            isRegister
              ? "Create professional resumes, get AI-powered suggestions, and stand out from the crowd."
              : "Log in to continue building your resume and get smart suggestions to improve it."
          }
        />
        <section className="auth-card">
          <p className="auth-mobile-brand">AI Resume Builder</p>
          <h1 className="auth-title">{isRegister ? "Create Account" : "Welcome Back!"}</h1>
          <p className="auth-subtitle">
            {isRegister
              ? "Let’s get started! Create your account to build your resume."
              : "Login to access your account and continue building your resume."}
          </p>

          {!isRegister && location.state?.registered && (
            <p className="auth-success" role="status">
              Account created successfully! Please log in.
            </p>
          )}
          {message && (
            <p className="auth-banner-error" role="alert">{message}</p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {fields.map(([name, label, type, placeholder, autoComplete]) => {
              const isPassword = type === "password";
              const input = (
                <input
                  id={name}
                  name={name}
                  type={isPassword && visible[name] ? "text" : type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  value={form[name]}
                  onChange={handleChange}
                  className={`${isPassword ? "has-toggle " : ""}${errors[name] ? "input-error" : ""}`}
                />
              );

              return (
                <div className="auth-field" key={name}>
                  <label htmlFor={name}>{label}</label>
                  {isPassword ? (
                    <div className="auth-input-wrap">
                      {input}
                      <button
                        type="button"
                        className="auth-toggle"
                        onClick={() => togglePassword(name)}
                        aria-label={visible[name] ? "Hide password" : "Show password"}
                      >
                        {visible[name] ? "Hide" : "Show"}
                      </button>
                    </div>
                  ) : input}
                  {errors[name] && (
                    <p className="auth-error" role="alert">{errors[name]}</p>
                  )}
                </div>
              );
            })}
            <button type="submit" className="auth-submit">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Login" : "Register"}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
