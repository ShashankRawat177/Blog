import { useState } from "react";

import type { Comment } from "../types/comment";

import {
  updateComment,
  deleteComment,
} from "../api/commentApi";

interface Props {
  comment: Comment;

  onRefresh: () => void;
}

export default function CommentCard({
  comment,
  onRefresh,
}: Props) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const canEdit =
    user &&
    (
      user.role === "admin" ||
      user.id === comment.author.id
    );

  const [editing, setEditing] =
    useState(false);

  const [content, setContent] =
    useState(comment.content);

  const handleSave = async () => {
    try {
      await updateComment(
        comment.id,
        content
      );

      setEditing(false);

      onRefresh();
    } catch (err) {
      console.error(err);

      alert("Unable to update comment.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteComment(
        comment.id
      );

      onRefresh();
    } catch (err) {
      console.error(err);

      alert("Unable to delete comment.");
    }
  };

  return (
    <div className="border rounded-xl p-5 mb-5">

      <div className="flex justify-between">

        <div>

          <h3 className="font-bold text-lg">
            {comment.author.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {new Date(
              comment.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        {canEdit && (

          <div className="flex gap-3">

            <button
              onClick={() =>
                setEditing(
                  !editing
                )
              }
              className="text-blue-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-red-600"
            >
              Delete
            </button>

          </div>

        )}

      </div>

      {editing ? (

        <>

          <textarea
            className="w-full border rounded-lg p-3 mt-4"
            rows={4}
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
          />

          <button
            onClick={handleSave}
            className="mt-3 bg-black text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

        </>

      ) : (

        <p className="mt-4 whitespace-pre-wrap">

          {comment.content}

        </p>

      )}

    </div>
  );
}