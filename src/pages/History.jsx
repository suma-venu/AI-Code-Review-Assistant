import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";

function History() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setErrorMessage("Please log in to view your review history.");
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setReviews(data ?? []);
    } catch (error) {
      console.error("History fetch error:", error);
      setErrorMessage("Unable to load your review history.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Review History
          </h1>

          <p className="mt-2 text-slate-600">
            View your previously saved code reviews and AI explanations.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="mt-4 text-slate-600">Loading your reviews...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {errorMessage}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">📭</div>
            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              No reviews yet
            </h2>
            <p className="mt-2 text-slate-500">
              Submit code from the Dashboard and it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <p className="text-sm font-medium text-slate-600">
                    📅{" "}
                    {new Date(review.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="space-y-6 p-6">
                  <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h2 className="text-lg font-bold text-amber-700">
                      ⚠️ ESLint Issue
                    </h2>
                    <p className="mt-3 leading-7 text-slate-800">
                      {review.issue}
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-lg font-bold text-slate-800">
                      💻 Source Code
                    </h2>

                    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-7 text-green-400">
                      <code>{review.code}</code>
                    </pre>
                  </section>

                  <section className="rounded-xl border border-sky-200 bg-sky-50 p-5">
                    <h2 className="mb-4 text-lg font-bold text-blue-700">
                      🤖 AI Explanation
                    </h2>

                    <div className="rounded-lg bg-white p-5 text-slate-700">
                      <ReactMarkdown>{review.ai_explanation}</ReactMarkdown>
                    </div>
                  </section>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default History;