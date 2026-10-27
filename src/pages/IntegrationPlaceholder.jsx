import { Link, useLocation } from "react-router-dom";

const placeholderDetails = {
  "/login": {
    title: "Welcome back.",
    description: "The login page will be connected here by your authentication team.",
  },
  "/register": {
    title: "Your next chapter starts here.",
    description: "The registration page will be connected here by your authentication team.",
  },
  "/create-resume": {
    title: "Your resume starts here.",
    description: "The resume creation flow can be connected here when it is ready.",
  },
  "/create-with-ai": {
    title: "A little help with your words.",
    description: "The AI resume-writing flow can be added here in a future step.",
  },
  "/templates": {
    title: "Find your look.",
    description: "The resume template selection experience can be connected here later.",
  },
  "/tips": {
    title: "A few tips to get you going.",
    description: "Lead with your strengths, use clear action verbs, and tailor your resume to each role. Keep it easy to scan, proofread carefully, and focus on results you can explain.",
  },
  "/my-resumes": {
    title: "Your resumes will live here.",
    description: "Saved resume history will appear here after a backend and database are connected.",
  },
};

function IntegrationPlaceholder() {
  const { pathname } = useLocation();
  const details = placeholderDetails[pathname] ?? {
    title: "This page is ready for integration.",
    description: "Connect your team’s page here when it is available.",
  };

  return (
    <main className="integration-page page-container">
      <div className="integration-card">
        <span className="integration-mark" aria-hidden="true">✦</span>
        <span className="eyebrow">COMING TOGETHER</span>
        <h1>{details.title}</h1>
        <p>{details.description}</p>
        <div className="integration-actions">
          <Link className="button button-primary" to="/home">Back to dashboard</Link>
          <Link className="text-link" to="/">Visit welcome page <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </main>
  );
}

export default IntegrationPlaceholder;
