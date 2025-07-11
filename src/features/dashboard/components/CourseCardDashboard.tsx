import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";
import type { Course } from "../types";

const statusColors  = {
  Published: "bg-green-500",
  "In Progress": "bg-yellow-500",
  Rejected: "bg-red-500",
};

const CourseCardDashboard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`?modal=edit&id=${course.id}`);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      console.log("Deleted", course.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded text-white ${statusColors[course.status]}`}
        >
          {course.status}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-dark-600 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.students} students enrolled</p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <ButtonUI className="bg-transparent px-6 text-primary-400 border border-primary-400" onClick={handleEdit}>Edit</ButtonUI>
          <ButtonUI className="bg-transparent px-6 text-red-500 border border-red-500" onClick={handleDelete}>Delete</ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDashboard;
