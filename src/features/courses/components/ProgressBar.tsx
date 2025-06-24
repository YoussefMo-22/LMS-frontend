interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Question {current} of {total}</span>
        <span>{percent}% Complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-primary-400 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
