import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex justify-center items-center">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border rounded-xl p-8 shadow"
        >

          <h1 className="text-4xl font-bold mb-8">
            Login
          </h1>

          {error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded-lg p-3 mb-6"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mb-8"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-800"
          >
            Login
          </button>

          <p className="mt-6 text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-green-700 ml-2"
            >
              Register
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}