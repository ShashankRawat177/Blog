import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

import { getPostsByTag } from "../api/tagApi";

import type { Post } from "../types/post";

export default function TagPosts() {
  const { id } = useParams();

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!id) return;

      try {
        const data =
          await getPostsByTag(
            Number(id)
          );

        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [id]);

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

      <main className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-12">
          Tagged Posts
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}

        </div>

      </main>
    </>
  );
}