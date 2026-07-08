import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import LikeButton from "../components/LikeButton";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import TagBadge from "../components/TagBadge";

import {
  getPost,
  deletePost,
} from "../api/postApi";

import {
  getComments,
} from "../api/commentApi";

import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

export default function PostPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [post, setPost] =
    useState<Post | null>(null);

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadComments = async () => {
    if (!id) return;

    try {
      const data = await getComments(id);

      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadPage = async () => {
      if (!id) return;

      try {
        const postData =
          await getPost(id);

        setPost(postData);

        const commentData =
          await getComments(id);

        setComments(commentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmDelete) return;

    try {
      await deletePost(id);

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        "Unable to delete post."
      );
    }
  };

  if (loading)
    return (
      <>
        <Navbar />

        <div className="text-center mt-20">
          Loading...
        </div>
      </>
    );

  if (!post)
    return (
      <>
        <Navbar />

        <div className="text-center mt-20">
          Post not found.
        </div>
      </>
    );

  const canEdit =
    user &&
    (
      user.role === "admin" ||
      user.id === post.author.id
    );

    
   return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">

        <Link
          to="/"
          className="text-green-700 hover:underline"
        >
          ← Back to Home
        </Link>

        <img
          src={
            post.imageUrl
              ? `http://localhost:3000${post.imageUrl}`
              : "https://picsum.photos/1200/600"
          }
          alt={post.title}
          className="w-full h-[450px] object-cover rounded-xl mt-6"
        />

        <h1 className="text-5xl font-bold mt-10">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-6 mt-6 text-gray-500">

          <span>
            By {post.author.name}
          </span>

          <span>
            {new Date(
              post.createdAt
            ).toLocaleDateString()}
          </span>

        </div>

        {/* Tags */}

        {post.tags &&
          post.tags.length > 0 && (

          <div className="flex flex-wrap gap-2 mt-6">

            {post.tags.map((tag) => (
              <TagBadge
                key={tag.id}
                id={tag.id}
                name={tag.name}
              />
            ))}

          </div>

        )}

        {/* Likes */}

        <div className="mt-8">

          <LikeButton
            postId={post.id}
            initialLikes={post.likeCount}
          />

        </div>

        {/* Edit / Delete */}

        {canEdit && (

          <div className="flex gap-4 mt-8">

            <button
              onClick={() =>
                navigate(`/edit/${post.id}`)
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        )}

        {/* Content */}

        <article className="mt-10 text-lg leading-8 whitespace-pre-wrap">

          {post.content}

        </article>

        {/* Comments */}

        <section className="mt-20">

          <h2 className="text-3xl font-bold mb-8">

            Comments ({comments.length})

          </h2>

          <CommentForm
            postId={id!}
            onCommentAdded={loadComments}
          />

          <div className="mt-10">

            {comments.length === 0 ? (

              <div className="text-gray-500">

                No comments yet.

              </div>

            ) : (

              comments.map((comment) => (

                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onRefresh={loadComments}
                />

              ))

            )}

          </div>

        </section>

      </main>

    </>
  );
}