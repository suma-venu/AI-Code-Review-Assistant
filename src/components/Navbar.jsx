import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold hover:text-blue-200 transition"
          >
           🛡 CodeGuard
          </Link>

          {/* Navigation */}

          <div className="flex items-center gap-8 text-lg">

            {!user ? (
              <>
                <Link to="/" className="hover:text-blue-200 transition">
                  Home
                </Link>

                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/history"
                  className="hover:text-blue-200 transition"
                >
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;