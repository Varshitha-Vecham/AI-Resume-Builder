import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return <header className="site-header"><nav className="navbar page-container" aria-label="Main navigation">
    <Link className="brand" to="/home">AI Resume Builder</Link>
    <div className="nav-links">
      <NavLink to="/home">Home</NavLink><NavLink to="/about">About</NavLink>
      <span>Features</span><span>Templates</span><span>Feedback</span><span>Contact Us</span><span>Dashboard</span>
      <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
    </div>
  </nav></header>;
}
