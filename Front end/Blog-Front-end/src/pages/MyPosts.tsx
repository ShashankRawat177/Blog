import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

import { getMyPosts } from "../api/postApi";

import type { Post } from "../types/post";

export default function MyPosts() {
  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data =
          await getMyPosts();

        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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
          My Posts
        </h1>

        {posts.length === 0 ? (

          <p>
            You haven't created any posts yet.
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {posts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
              />

            ))}

          </div>

        )}

      </main>

    </>
  );
}