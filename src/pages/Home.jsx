import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">
          

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
  Review Your Code with AI
</h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto">
  Get instant ESLint feedback and beginner-friendly AI explanations
  to improve your JavaScript code with confidence.
</p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">

            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
            >
              🚀 Start Reviewing
            </Link>

            <Link
              to="/history"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition"
            >
              📜 View History
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Our Platform?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

         <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold mb-3">AI Review</h3>
            <p className="text-gray-600">
              Receive beginner-friendly explanations powered by Gemini AI.
            </p>
          </div>

           <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-3">Static Analysis</h3>
            <p className="text-gray-600">
              Detect coding mistakes instantly using ESLint.
            </p>
          </div>

           <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4">📜</div>
            <h3 className="text-2xl font-semibold mb-3">History</h3>
            <p className="text-gray-600">
              Access all your previous code reviews anytime.
            </p>
          </div>

           <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold mb-3">Secure Login</h3>
            <p className="text-gray-600">
              Supabase authentication keeps your reviews protected.
            </p>
          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="mt-2 text-lg">Reviews Completed</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">95%</h3>
            <p className="mt-2 text-lg">Issue Detection Accuracy</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">100%</h3>
            <p className="mt-2 text-lg">Secure Authentication</p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-lg font-semibold">
            Built with React • Node.js • ESLint • Gemini AI • Supabase
          </p>

          <p className="mt-3 text-sm">
            © 2026 AI Code Review Assistant. All Rights Reserved.
          </p>

        </div>

      </footer>
    </>
  );
}

export default Home;