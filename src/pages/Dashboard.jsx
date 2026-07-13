import { useState } from "react";


import "../styles/Dashboard.css";

function Dashboard() {
const [code, setCode] = useState("");
const [reviewResult, setReviewResult] = useState("");
 const handleReview = () => {

  if (code.trim() === "") {
    alert("Please enter some code first!");
    return;
  }

 setReviewResult(`
✅ Code received successfully!

📄 Total characters: ${code.length}

🤖 AI review will be displayed here after backend integration.
`);

};

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <p>Welcome to AI Code Review Assistant</p>

      <textarea
  placeholder="Paste your code here..."
  value={code}
  onChange={(e) => setCode(e.target.value)}
></textarea>

      <button className="review-btn"  onClick={handleReview}>
         
        Review Code
      </button>

      <div className="result-box">

        <h2>Review Results</h2>

        <p>
  {reviewResult || "Your AI review results will appear here."}
</p>

      </div>

    </div>
  );
}

export default Dashboard;