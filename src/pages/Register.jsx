import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthVisual from "../components/AuthVisual.jsx";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validate() {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const email = form.email.trim().toLowerCase();

    if (users.some((user) => user.email === email)) {
      setErrors({ email: "An account with this email already exists." });
      return;
    }

    users.push({ name: form.name.trim(), email, password: form.password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login", { state: { registered: true } });
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <AuthVisual
          title="Build Your Dream Career"
          text="Create professional resumes, get AI-powered suggestions, and stand out from the crowd."
        />

        <section className="auth-card">
          <p className="auth-mobile-brand">AI Resume Builder</p>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Let’s get started! Create your account to build your resume.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <p className="auth-error" role="alert">{errors.name}</p>}
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="auth-error" role="alert">{errors.email}</p>}
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className={`has-toggle ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="auth-error" role="alert">{errors.password}</p>}
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input-wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`has-toggle ${errors.confirmPassword ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="auth-error" role="alert">{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="auth-submit">Register</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
