interface PageSizeSelectorProps {
  currentPageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  options?: number[];
}

export default function PageSizeSelector({
  currentPageSize,
  onPageSizeChange,
  options = [6, 12, 24, 48],
}: PageSizeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">
        Show:
      </label>
      <select
        value={currentPageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size} courses
          </option>
        ))}
      </select>
    </div>
  );
} 