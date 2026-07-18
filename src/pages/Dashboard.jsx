import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import ReactMarkdown from "react-markdown";



function Dashboard() {
const [code, setCode] = useState("");
const [reviewResult, setReviewResult] = useState(null);
const [aiExplanation, setAiExplanation] = useState("");
const [loading, setLoading] = useState(false);
const resultsRef = useRef(null);


 const handleReview = async () => {
  if (code.trim() === "") {
    alert("Please enter some code first!");
    return;
  }

  try {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Please log in again.");
      return;
    }

    const response = await fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        user_id: user.id,
      }),
    });

    if (!response.ok) {
      throw new Error("Review request failed.");
    }

    const data = await response.json();

    setReviewResult(data.review);
    setAiExplanation(data.aiExplanation);

    setTimeout(() => {
  resultsRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

  } catch (error) {
    console.error("Review error:", error);
    alert("Unable to review the code. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-6">

    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold text-gray-800">
        Code Review
      </h1>

      <p className="text-gray-600 mt-2 mb-8">
        Paste your JavaScript code below and receive AI-powered feedback.
      </p>

      {/* Code Input */}

      <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-700">

        <h2 className="text-white text-lg font-semibold mb-4">
  JavaScript Editor
</h2>

        <textarea
        disabled={loading}
          className="w-full h-80 bg-slate-900 text-green-400 rounded-xl p-4 font-mono text-sm focus:outline-none resize-none"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <div className="flex justify-center mt-6">
  
 <button
  onClick={handleReview}
  disabled={loading}
  className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed min-w-[220px]"
>
  {loading ? (
    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      Analyzing your code...
    </>
  ) : (
    <>
      🤖 Review Code
    </>
  )}
</button>

</div>

      </div>

      {/* Results */}

     <div
  ref={resultsRef}
  className="bg-white rounded-2xl shadow-lg p-6 mt-8 scroll-mt-24"
>

       <h2 className="text-3xl font-bold text-slate-800 mb-6">
  📋 Review Results
</h2>

        {!reviewResult ? (

          <p className="text-gray-500">
            Your AI review results will appear here.
          </p>

        ) : reviewResult[0].messages.length === 0 ? (

          <div className="bg-green-100 text-green-700 p-4 rounded-xl">
            ✅ No issues found!
          </div>

        ) : (

          <>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm mb-6">

              <h3 className="text-xl font-bold text-amber-700 mb-5">
  ⚠️ ESLint Analysis
</h3>

             <div className="flex gap-3 mb-3">
  <span className="font-semibold text-gray-700 w-24">Issue</span>
  <span>{reviewResult[0].messages[0].message}</span>
</div>

              <div className="flex gap-3 mb-3">
  <span className="font-semibold text-gray-700 w-24">Rule</span>
  <span>
  {reviewResult[0].messages[0].ruleId || "Parsing Error"}
</span>
</div>


<div className="flex gap-3 mb-3">
  <span className="font-semibold text-gray-700 w-24">Line</span>
  <span>{reviewResult[0].messages[0].line ?? "-"}</span>
</div>

              <div className="flex gap-3 mb-3">
  <span className="font-semibold text-gray-700 w-24">Column</span>
  <span>{reviewResult[0].messages[0].column ?? "-"}</span>
</div>

            </div>

           <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 shadow-sm">

             <h3 className="text-xl font-bold text-blue-700 mb-5">
                🤖 AI Explanation
              </h3>

              <div className="bg-white rounded-lg p-5 prose prose-slate max-w-none">
  <ReactMarkdown>
    {aiExplanation}
  </ReactMarkdown>
</div>

            </div>

          </>

        )}

      </div>

    </div>

  </div>
);
}

export default Dashboard;