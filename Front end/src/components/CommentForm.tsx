import { useState } from "react";

import { createComment } from "../api/commentApi";

interface Props {
  postId: string;

  onCommentAdded: () => void;
}

export default function CommentForm({
  postId,
  onCommentAdded,
}: Props) {
  const token = localStorage.getItem("token");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setLoading(true);

      await createComment(
        postId,
        content
      );

      setContent("");

      onCommentAdded();
    } catch (err) {
      console.error(err);

      alert(
        "Unable to add comment."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="border rounded-xl p-5 text-center text-gray-500">
        Login to leave a comment.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-5"
    >

      <h3 className="text-2xl font-bold mb-5">
        Leave a Comment
      </h3>

      <textarea
        rows={5}
        className="w-full border rounded-lg p-3"
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
      />

      <button
        disabled={loading}
        className="mt-5 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
      >
        {loading
          ? "Posting..."
          : "Post Comment"}
      </button>

    </form>
  );
}