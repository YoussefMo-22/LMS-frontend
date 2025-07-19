import AdminCourseCard from "./AdminCourseCard";
import React from "react";
import { useAdminCourses } from '../../courses/hooks/useCourseFlow';

const AdminCourseList = () => {
  const { data, isLoading, error } = useAdminCourses();
  const courses = data?.data?.courses || [];

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div className="text-red-500">Error loading courses: {error.message}</div>;
  if (courses.length === 0) return <div>No courses found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <AdminCourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default React.memo(AdminCourseList); 