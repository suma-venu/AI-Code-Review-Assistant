import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <p>Welcome to AI Code Review Assistant</p>

      <textarea
        placeholder="Paste your code here..."
      ></textarea>

      <button className="review-btn">
        Review Code
      </button>

      <div className="result-box">

        <h2>Review Results</h2>

        <p>
          Your AI review results will appear here.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;