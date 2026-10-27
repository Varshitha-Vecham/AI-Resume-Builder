import "../styles/Home.css";
const features = [["Easy Resume Creation", "Organize your education, skills, and experience in one clear resume."], 
["Professional Templates", "Choose from clean resume layouts designed for a strong first impression."], 
["AI Assistance", "Get helpful guidance while writing resume content that represents you well."]];
export default function Home() {
  return <main className="home-page page-container">
    <section className="home-hero">
      <p className="eyebrow">BUILD YOUR FUTURE</p>
      <h1>Create a resume that opens doors.</h1>
      <p>AI Resume Builder makes it easier for students and job seekers to prepare a clear, professional resume.</p>
      <button className="button button-primary" type="button">Create Your Resume</button>
      </section><section className="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Everything you need to get started</h2>
        <div className="feature-grid">{features.map(([title, description]) => <article className="feature-card" key={title}>
          <h3>{title}</h3>
          <p>{description}</p></article>)}
        </div>
      </section>
    </main>;
}
