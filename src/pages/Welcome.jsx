import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import "../styles/Welcome.css";

const benefits = [
  {
    icon: "✦",
    title: "A little help from AI",
    text: "Turn your experience into clear, confident resume content.",
  },
  {
    icon: "▤",
    title: "Made to stand out",
    text: "Start with polished layouts that put your story first.",
  },
  {
    icon: "↗",
    title: "Ready for what’s next",
    text: "Create a resume you feel good about sharing with employers.",
  },
];

function ResumePreview() {
  return (
    <div className="resume-scene" aria-label="Preview of a professional resume">
      <div className="scene-orbit scene-orbit-one" />
      <div className="scene-orbit scene-orbit-two" />
      <div className="resume-paper">
        <div className="resume-topline">
          <span className="resume-avatar">JD</span>
          <span className="resume-status"><i /> RESUME PREVIEW</span>
        </div>
        <h2>Jordan Davis</h2>
        <p className="resume-role">Product designer <span>·</span> New York, NY</p>
        <div className="resume-rule" />
        <span className="resume-label">PROFILE</span>
        <div className="resume-line resume-line-wide" />
        <div className="resume-line resume-line-medium" />
        <span className="resume-label resume-section-label">EXPERIENCE</span>
        <div className="resume-entry">
          <span className="resume-entry-dot" />
          <div>
            <strong>Product Designer</strong>
            <small>Studio North <span>·</span> 2022 — Present</small>
            <div className="resume-line resume-line-wide" />
            <div className="resume-line resume-line-short" />
          </div>
        </div>
        <div className="resume-entry">
          <span className="resume-entry-dot resume-entry-dot-light" />
          <div>
            <strong>Design Intern</strong>
            <small>Goodside Co. <span>·</span> 2021 — 2022</small>
          </div>
        </div>
        <span className="resume-label resume-section-label">EDUCATION</span>
        <div className="resume-line resume-line-medium" />
        <div className="resume-line resume-line-short" />
      </div>
      <div className="floating-note">
        <span className="note-sparkle">✦</span>
        <span><strong>Your story, polished.</strong><small>One step closer to your next role</small></span>
      </div>
      <span className="scene-star scene-star-one">✳</span>
      <span className="scene-star scene-star-two">✦</span>
    </div>
  );
}

function Welcome() {
  return (
    <>
      <Navbar landing />
      <main>
        <section className="welcome-hero page-container">
          <div className="hero-copy">
            <div className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Make your next move <span>your best one.</span></h1>
            <p className="hero-description">
              Build a resume that feels like you. Get thoughtful help shaping
              your experience into a story employers remember.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary button-large" to="/register">
                Build my resume <span aria-hidden="true">→</span>
              </Link>
              <a className="button button-secondary button-large" href="#features">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-trust">
              <span className="trust-avatars" aria-hidden="true">
                <i>J</i><i>A</i><i>M</i>
              </span>
              <span>Made for students, graduates &amp; go-getters</span>
            </div>
          </div>
          <ResumePreview />
        </section>

        <section className="features-section" id="features">
          <div className="page-container">
            <div className="section-heading">
              <div className="eyebrow"><span /> A BETTER WAY TO BEGIN</div>
              <h2>Big career energy.<br /><span>Without the blank-page panic.</span></h2>
              <p>Everything you need to put your best self on paper.</p>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="benefit-card" key={benefit.title}>
                  <span className={`benefit-icon benefit-icon-${index + 1}`} aria-hidden="true">
                    {benefit.icon}
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                  <span className="benefit-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <div className="feature-cta">
              <div><strong>Good things start with a first draft.</strong><span>Make yours today, at your own pace.</span></div>
              <Link className="button button-light button-small" to="/register">Let’s get started <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Welcome;
