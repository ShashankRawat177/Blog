import { Link } from "react-router-dom";

import type { Post } from "../types/post";

import TagBadge from "./TagBadge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({
  post,
}: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`}>

      <article className="rounded-xl overflow-hidden border shadow hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-white">

        <img
          src={
            post.imageUrl
              ? `http://localhost:3000${post.imageUrl}`
              : "https://picsum.photos/600/400"
          }
          alt={post.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">

          <h2 className="text-2xl font-bold">

            {post.title}

          </h2>

          <p className="mt-4 text-gray-600 line-clamp-4">

            {post.content}

          </p>

          {post.tags?.length > 0 && (

            <div className="flex flex-wrap gap-2 mt-5">

              {post.tags.map((tag) => (

                <TagBadge
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                />

              ))}

            </div>

          )}

          <div className="flex justify-between items-center mt-6 text-gray-500 text-sm">

            <span>

              ❤️ {post.likeCount}

            </span>

            <span>

              💬 {post.commentCount}

            </span>

          </div>

          <div className="mt-6 flex justify-between text-sm text-gray-500">

            <span>

              {post.author?.name ?? "Unknown Author"}

            </span>

            <span>

              {new Date(
                post.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

        </div>

      </article>

    </Link>
  );
}