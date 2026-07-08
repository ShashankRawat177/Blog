import { useEffect, useState } from "react";

import {
  likePost,
  unlikePost,
  checkLike,
} from "../api/likeApi";

interface Props {
  postId: number;

  initialLikes: number;
}

export default function LikeButton({
  postId,
  initialLikes,
}: Props) {
  const token = localStorage.getItem("token");

  const [liked, setLiked] =
    useState(false);

  const [likes, setLikes] =
    useState(initialLikes);

  useEffect(() => {
    const loadLike = async () => {
      if (!token) return;

      try {
        const data =
          await checkLike(postId);

        setLiked(data.liked);
      } catch (err) {
        console.error(err);
      }
    };

    loadLike();
  }, [postId]);

  const toggleLike = async () => {
    if (!token) {
      alert("Login first.");
      return;
    }

    try {
      if (liked) {
        await unlikePost(postId);

        setLiked(false);

        setLikes((prev) => prev - 1);
      } else {
        await likePost(postId);

        setLiked(true);

        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-2 text-lg"
    >
      {liked ? "❤️" : "🤍"}

      {likes}
    </button>
  );
}