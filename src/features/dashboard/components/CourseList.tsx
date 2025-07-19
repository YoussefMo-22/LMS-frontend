import CourseCardDashboard from "./CourseCardDashboard";
import React from "react";
import { useInstructorCourses } from '../../courses/hooks/useCourseFlow';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const { data, isLoading, error } = useInstructorCourses();
  const courses = data?.data?.courses || [];
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div className="text-red-500">Error loading courses: {error.message}</div>;
  if (courses.length === 0) return <div>No courses found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course._id} className="relative">
          <CourseCardDashboard course={course} />
          {user?.role === 'admin' && (
            <button
              className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-blue-600"
              onClick={() => navigate(`/admin/courses/${course._id}/enrollments`)}
            >
              View Enrollments
            </button>
          )}
          {user?.role === 'instructor' && (
            <button
              className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-green-600"
              onClick={() => navigate(`/instructor/courses/${course._id}/lessons`)}
            >
              Manage Lessons
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(CourseList);
