import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ landing = false }) {
  return (
    <header className={`site-header${landing ? " site-header--landing" : ""}`}>
      <nav className="navbar page-container" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="AI Resume Builder home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3.75h7.2L19 8.6v11.65H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M14 4v5h5M9 13h6M9 16.5h6M9 9.5h1.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>resume<span className="brand-accent">craft</span></span>
        </Link>

        {landing ? (
          <div className="navbar-actions">
            <a className="nav-login" href="/login">Log in</a>
            <Link className="button button-primary button-small" to="/register">
              Get started <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="navbar-actions">
            <Link className="nav-home-link" to="/home">Dashboard</Link>
            <Link className="button button-primary button-small" to="/login">
              Log in
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
