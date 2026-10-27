import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3.75h7.2L19 8.6v11.65H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M14 4v5h5M9 13h6M9 16.5h6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>resume<span className="brand-accent">craft</span></span>
        </Link>
        <p>Helping your next opportunity find you.</p>
        <span className="footer-copy">© {new Date().getFullYear()} ResumeCraft. Built for your next chapter.</span>
      </div>
    </footer>
  );
}

export default Footer;
