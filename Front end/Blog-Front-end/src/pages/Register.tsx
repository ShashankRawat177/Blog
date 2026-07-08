import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Unable to register.");
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
            Register
          </h1>

          {error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}

          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3 mb-6"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
              setPassword(e.target.value)
            }
          />

          <button
            className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-800"
          >
            Register
          </button>

          <p className="mt-6 text-center">

            Already have an account?

            <Link
              to="/login"
              className="text-green-700 ml-2"
            >
              Login
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}