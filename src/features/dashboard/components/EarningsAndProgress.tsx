const EarningsAndProgress = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="font-bold text-2xl text-primary-400 mb-2">Earnings per Course</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Advanced React Patterns</p>
            <span className="text-gray-500">(180 students)</span>
          </div>
          <div className="text-blue-600 font-bold">$130.00</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="font-bold text-2xl text-primary-400 mb-2">In Progress</h4>
        <div>
          <p className="font-semibold">Advanced React Patterns</p>
          <span className="text-gray-500">(4 Videos)</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsAndProgress;