import { Link } from "react-router-dom";
import "../styles/Welcome.css";

export default function Welcome() {
  return <main className="welcome-page">
    <section className="welcome-card" aria-labelledby="welcome-title">
      <p className="welcome-brand">AI Resume Builder</p>
      <h1 id="welcome-title">Welcome to AI Resume Builder</h1>
      <p className="welcome-text">Create a professional-looking resume that 
        helps you take the next step in your career.</p>
      <div className="welcome-actions"><Link className="button button-primary" to="/register">Get Started</Link>
      <Link className="button button-outline" to="/login">Login</Link></div></section></main>;
}
