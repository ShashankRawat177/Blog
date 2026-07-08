import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/api";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Unable to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold mb-10">
          Create Post
        </h1>

        {error && (
          <p className="text-red-500 mb-6">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Title
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Content
            </label>

            <textarea
              rows={12}
              className="w-full border rounded-lg p-3"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              required
            />

          </div>

          <button
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "Publishing..."
              : "Publish Post"}
          </button>

        </form>

      </div>
    </>
  );
}