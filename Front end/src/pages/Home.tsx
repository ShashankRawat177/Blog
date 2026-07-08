import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

import {
  getPosts,
  searchPosts,
} from "../api/postApi";

import type { Post } from "../types/post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 6;

  const [totalPages, setTotalPages] =
    useState(1);

  const [searchParams] =
    useSearchParams();

  const searchQuery =
    searchParams.get("search");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);

      try {
        let response;

        if (
          searchQuery &&
          searchQuery.trim() !== ""
        ) {
          response =
            await searchPosts(
              searchQuery,
              page,
              limit
            );
        } else {
          response =
            await getPosts(
              page,
              limit
            );
        }

        setPosts(response.data);

        setTotalPages(
          response.totalPages
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, searchQuery]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center text-3xl">
          {searchQuery
            ? `No results found for "${searchQuery}"`
            : "No posts found"}
        </div>
      </>
    );
  }

  const featuredPost = posts[0];

  return (
    <>
      <Navbar />

      {!searchQuery && (
        <section className="max-w-7xl mx-auto py-16 text-center px-6">

          <p className="uppercase tracking-[0.3em] text-gray-500">
            Everything is personal, including this blog.
          </p>

          <h1 className="text-7xl font-serif mt-5">
            Train of Thought
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600">
            Thoughts, tutorials and stories about software,
            technology and everything I'm learning.
          </p>

        </section>
      )}

      {!searchQuery && featuredPost && (

        <section className="max-w-6xl mx-auto px-6 pb-20">

            <Link
              to={`/posts/${featuredPost.id}`}
              className="block rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              <img
                src={
                  featuredPost.imageUrl
                    ? `http://localhost:3000${featuredPost.imageUrl}`
                    : "https://picsum.photos/1200/600"
                }
                alt={featuredPost.title}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-8">

                <h2 className="text-4xl font-bold hover:text-green-700 transition">
                  {featuredPost.title}
                </h2>

                <p className="mt-5 text-gray-600">
                  {featuredPost.content.substring(0, 220)}...
                </p>

                <div className="flex justify-between items-center mt-8 text-sm text-gray-500">

                  <span>
                    By {featuredPost.author?.name ?? "Unknown Author"}
                  </span>

                  <span>
                    {new Date(
                      featuredPost.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

            </Link>

        </section>

      )}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl text-center mb-12 font-serif">

          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Latest Thoughts"}

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {(searchQuery
            ? posts
            : posts.slice(1)
          ).map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}

        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </section>

    </>
  );
}