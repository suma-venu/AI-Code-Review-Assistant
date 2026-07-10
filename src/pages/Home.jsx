
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="home">
        <h1>AI Code Review Assistant</h1>

        <p>Improve your code quality with AI-powered code reviews.</p>

        <button>Review My Code</button>
      </div>
    </div>
  );
}

export default Home;