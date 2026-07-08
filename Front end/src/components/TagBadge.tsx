import { Link } from "react-router-dom";

interface Props {
  id: number;

  name: string;
}

export default function TagBadge({
  id,
  name,
}: Props) {
  return (
    <Link
      to={`/tags/${id}`}
      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm"
    >
      #{name}
    </Link>
  );
}