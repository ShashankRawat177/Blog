import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getPost, updatePost } from "../api/postApi";

export default function EditPost() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadPost = async () => {
      if (!id) return;

      try {
        const post = await getPost(id);

        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        console.error(err);
        setError("Unable to load post.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, navigate]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!id) return;

    setSaving(true);

    try {
      await updatePost(
        id,
        title,
        content
      );

      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to update post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold mb-10">
          Edit Post
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
            />

          </div>

          <button
            disabled={saving}
            className="bg-black text-white px-8 py-3 rounded-lg"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </div>
    </>
  );
}