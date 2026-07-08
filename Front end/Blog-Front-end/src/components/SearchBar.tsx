import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(
      `/?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >

      <input
        type="text"
        placeholder="Search posts..."
        className="border rounded-full px-4 py-2 w-64"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      <button
        className="bg-black text-white px-5 rounded-full"
      >
        Search
      </button>

    </form>
  );
}