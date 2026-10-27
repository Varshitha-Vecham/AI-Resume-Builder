import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return <header className="site-header"><nav className="navbar page-container" aria-label="Main navigation">
    <Link className="brand" to="/home">AI Resume Builder</Link>
    <div className="nav-links">
      <NavLink to="/home">Home</NavLink><NavLink to="/about">About</NavLink>
      <span>Features</span><span>Templates</span><span>Feedback</span><span>Contact Us</span><span>Dashboard</span><span>Logout</span>
    </div>
  </nav></header>;
}
