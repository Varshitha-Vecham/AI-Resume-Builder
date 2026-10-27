import "../styles/About.css";
const points = [["What it is", "A simple resume-building application with a clean and easy-to-use interface."], 
["Why it is useful", "It supports students and job seekers who want to prepare a strong resume for internships and jobs."], 
["How it helps", "It guides users toward well-organized resume content and professional presentation."],
 ["Our objective", "To make resume preparation simpler, more accessible, and less stressful for every applicant."]];
export default function About() { return <main className="about-page page-container">
    <section className="about-intro"><p className="eyebrow">ABOUT THE PROJECT</p>
        <h1>Helping every applicant present their best self.</h1>
        <p>AI Resume Builder is a college mini-project that helps users create clear and professional resumes.</p>
    </section>
    <section className="about-grid">{points.map(([title, text]) => <article key={title}><h2>{title}</h2>
        <p>{text}</p></article>)}
    </section>
</main>; }
