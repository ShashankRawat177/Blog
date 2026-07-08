interface Props {
  page: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-6 mt-16">

      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="border px-5 py-2 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-semibold">

        Page {page} of {totalPages}

      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="border px-5 py-2 rounded-lg disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}