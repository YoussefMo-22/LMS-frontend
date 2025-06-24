interface Props {
  total: number;
  current: number;
  onChange: (index: number) => void;
  onSubmit: () => void;
}

export default function QuestionPagination({
  total,
  current,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        disabled={current === 0}
        onClick={() => onChange(current - 1)}
        className={`px-4 py-2 rounded-md border ${
          current === 0
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "border-primary-400 text-primary-400 hover:bg-primary-50"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-8 h-8 rounded-full font-semibold ${
              i === current
                ? "bg-primary-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {current === total - 1 ? (
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => onChange(current + 1)}
          className="px-4 py-2 rounded-md bg-primary-400 text-white hover:bg-primary-500"
        >
          Next
        </button>
      )}
    </div>
  );
}
