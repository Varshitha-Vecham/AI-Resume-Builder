import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthVisual from "../components/AuthVisual.jsx";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state && location.state.registered;

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setLoginError("");
  }

  function validate() {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Please enter your password.";
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
    const user = users.find(
      (savedUser) => savedUser.email === email && savedUser.password === form.password
    );

    if (!user) {
      setLoginError("Incorrect email or password. Please try again.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: user.name, email: user.email })
    );
    navigate("/home");
  }

  return (
    <main className="auth-page">
      <div className="auth-shell auth-shell-reverse">
        <AuthVisual
          title="Your Next Opportunity Awaits"
          text="Log in to continue building your resume and get smart suggestions to improve it."
        />

        <section className="auth-card">
          <p className="auth-mobile-brand">AI Resume Builder</p>
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">
            Login to access your account and continue building your resume.
          </p>

          {justRegistered && (
            <p className="auth-success" role="status">
              Account created successfully! Please log in.
            </p>
          )}
          {loginError && <p className="auth-banner-error" role="alert">{loginError}</p>}

          <form onSubmit={handleSubmit} noValidate>
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            <button type="submit" className="auth-submit">Login</button>
          </form>

          <p className="auth-switch">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
