import { Link } from "react-router-dom";
export default function IntegrationPlaceholder({ page }) 
{ const isLogin = page === "login"; return <main className="placeholder-page page-container">
    <section className="placeholder-card"><h1>{isLogin ? "Login page" : "Registration page"}</h1>
    <p>Your team can replace this placeholder with the {isLogin ? "Login" : "Registration"} component here.</p>
    <Link className="button button-primary" to="/">Back to Welcome</Link></section></main>; }
