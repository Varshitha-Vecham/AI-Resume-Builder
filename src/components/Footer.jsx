import "../styles/Footer.css";

export default function Footer() {
  return <footer className="site-footer">
    <div className="page-container footer-content">
      <div><strong>AI Resume Builder</strong>
      <p>A simple platform for building polished resumes with confidence.</p>
    </div>
    <div className="footer-note">
      <p>Built to help students and job seekers create professional resumes.</p>
      <small>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</small>
    </div>
    </div>
    </footer>;
}
