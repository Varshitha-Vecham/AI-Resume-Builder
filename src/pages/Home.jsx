import { Link } from "react-router-dom";
import "../styles/Home.css";

const tools = [
  {
    icon: "✦",
    tone: "tool-icon-purple",
    label: "YOUR PERSONAL WRITING PARTNER",
    title: "Build with AI",
    text: "Find the right words for your experience and make every bullet count.",
    link: "/create-with-ai",
    action: "Write with AI",
  },
  {
    icon: "▤",
    tone: "tool-icon-blue",
    label: "A GREAT PLACE TO START",
    title: "Find your template",
    text: "Choose a clean, professional look that fits the role you want.",
    link: "/templates",
    action: "Browse templates",
  },
  {
    icon: "☼",
    tone: "tool-icon-peach",
    label: "SMALL DETAILS, BIG IMPACT",
    title: "Resume tips",
    text: "Get practical advice to make your resume clearer and stronger.",
    link: "/tips",
    action: "See resume tips",
  },
];

function Home() {
  return (
    <main className="dashboard page-container">
      <section className="dashboard-welcome">
        <div>
          <div className="eyebrow"><span /> YOUR CAREER WORKSPACE</div>
          <h1>Create your <span>career story.</span></h1>
          <p>One good resume can open a lot of doors. Let’s make yours.</p>
        </div>
        <Link className="button button-primary button-large" to="/create-resume">
          <span className="button-plus" aria-hidden="true">＋</span> Create new resume
        </Link>
      </section>

      <section className="tool-grid" aria-label="Resume building tools">
        {tools.map((tool) => (
          <Link className="tool-card" to={tool.link} key={tool.title}>
            <span className={`tool-icon ${tool.tone}`} aria-hidden="true">{tool.icon}</span>
            <span className="tool-label">{tool.label}</span>
            <h2>{tool.title}</h2>
            <p>{tool.text}</p>
            <span className="tool-action">{tool.action}<span aria-hidden="true"> →</span></span>
          </Link>
        ))}
      </section>

      <section className="resume-area" id="my-resumes">
        <div className="resume-area-heading">
          <div>
            <span className="eyebrow">KEEP YOUR MOMENTUM</span>
            <h2>My resumes</h2>
          </div>
          <Link className="text-link" to="/my-resumes">View all <span aria-hidden="true">→</span></Link>
        </div>
        <div className="empty-resumes">
          <div className="empty-document" aria-hidden="true">
            <span /><span /><span /><i>＋</i>
          </div>
          <div>
            <h3>Your next opportunity starts with a draft.</h3>
            <p>Your resumes will show up here once you create one.</p>
          </div>
          <Link className="button button-secondary" to="/create-resume">Create your first resume <span aria-hidden="true">→</span></Link>
        </div>
        <p className="data-note"><span aria-hidden="true">ⓘ</span> Your resumes will appear here after resume saving is connected.</p>
      </section>

      <section className="steps-section" aria-labelledby="steps-heading">
        <div className="steps-intro">
          <span className="eyebrow">THREE SIMPLE STEPS</span>
          <h2 id="steps-heading">From “where do I start?”<br /><span>to “ready to apply.”</span></h2>
          <p>No complicated process. Just a little progress at a time.</p>
        </div>
        <div className="steps-list">
          <div className="step-item">
            <span className="step-number">01</span>
            <span><strong>Choose your starting point</strong><small>Pick a template or start with a little AI help.</small></span>
          </div>
          <div className="step-item">
            <span className="step-number">02</span>
            <span><strong>Add what makes you, you</strong><small>Share your education, experience, and strengths.</small></span>
          </div>
          <div className="step-item">
            <span className="step-number">03</span>
            <span><strong>Polish it and take the next step</strong><small>Review your story and get ready to apply.</small></span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
