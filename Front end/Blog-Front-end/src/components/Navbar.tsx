import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const canCreate =
    user &&
    (user.role === "author" ||
      user.role === "admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">

      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold tracking-wide"
        >
          Train of Thought
        </Link>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-green-700 transition"
          >
            Home
          </Link>

        </div>

        {/* Search */}

        <SearchBar />

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {canCreate && (
                <>
                  <Link
                    to="/create"
                    className="px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition"
                  >
                    Create Post
                  </Link>

                  <Link
                    to="/my-posts"
                    className="px-5 py-2 rounded-full border hover:bg-gray-100 transition"
                  >
                    My Posts
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border hover:bg-gray-100 transition"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </nav>

    </header>
  );
}