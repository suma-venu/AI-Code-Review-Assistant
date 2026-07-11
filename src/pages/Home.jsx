import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">

        <h1>AI Code Review Assistant</h1>

        <p>
          Review your code with Artificial Intelligence and
          powerful static code analysis.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Start Reviewing
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

           </div>

      <section className="features">

        <div className="feature-card">
          <h3>AI Code Review</h3>
          <p>Get intelligent suggestions to improve your code quality.</p>
        </div>

        <div className="feature-card">
          <h3>Static Analysis</h3>
          <p>Detect bugs, vulnerabilities and coding issues automatically.</p>
        </div>

        <div className="feature-card">
          <h3>Review History</h3>
          <p>View and manage all your previous code reviews.</p>
        </div>

        <div className="feature-card">
          <h3>Secure Authentication</h3>
          <p>Login securely and keep your review history protected.</p>
        </div>

      </section>

    </>
  );
}

export default Home;