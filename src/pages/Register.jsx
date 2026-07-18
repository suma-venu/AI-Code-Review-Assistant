import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (nameError) {
      alert("Please correct the name before registering.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center">

        <form
          onSubmit={handleRegister}
          className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <div className="mb-8 text-center">

            <div className="mb-4 text-4xl">🚀</div>

            <h1 className="text-3xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="mt-2 text-slate-500">
              Create your account and start reviewing code with AI.
            </p>

          </div>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setName(value);
                    setNameError("");
                  } else {
                    setNameError(
                      "Name should contain only letters."
                    );
                  }
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {nameError && (
                <p className="mt-2 text-sm text-red-600">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </main>
  );
}

export default Register;