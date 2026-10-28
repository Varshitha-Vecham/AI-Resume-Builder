// The navy "brand" panel shown beside the form on Login and Register.
// It is reused by both pages, so we only write it once.
export default function AuthVisual({ title, text }) {
  return (
    <aside className="auth-visual">
      <p className="auth-brand">AI Resume Builder</p>
      <h2>{title}</h2>
      <p className="auth-visual-text">{text}</p>

      <ul className="auth-features">
        <li>Create professional resumes</li>
        <li>Get AI-powered suggestions</li>
        <li>Improve your chances</li>
      </ul>

      {/* A small decorative resume preview made only with CSS */}
      <div className="auth-mock" aria-hidden="true">
        <div className="auth-mock-head">
          <span className="auth-mock-avatar"></span>
          <div>
            <span className="auth-mock-line w60"></span>
            <span className="auth-mock-line w40"></span>
          </div>
        </div>
        <span className="auth-mock-line"></span>
        <span className="auth-mock-line w80"></span>
        <div className="auth-mock-chips">
          <span>React</span>
          <span>JavaScript</span>
          <span>CSS</span>
        </div>
        <p className="auth-mock-score">
          AI Score <strong>72/100</strong>
        </p>
      </div>
    </aside>
  );
}
