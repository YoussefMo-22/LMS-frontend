const AssignmentTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className=" border-b">
            <th className="p-2 text-left">Assignment</th>
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Submissions</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Assignment 1</td>
            <td className="p-2">React Bootcamp</td>
            <td className="p-2">2025-07-10</td>
            <td className="p-2">25/40</td>
            <td className="p-2"><div className="bg-primary-400 py-2 px-6 text-center w-fit text-white rounded-lg">Active</div></td>
            <td className="p-2">
              <button className="border border-primary-400 py-2 px-3 rounded-lg mr-2">View</button>
              <button className="border border-primary-400 py-2 px-3 rounded-lg">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;