import React from "react";
import { useParams } from 'react-router-dom';
import { useCourseEnrollmentsAdmin } from '../../courses/hooks/useEnrollment';
import EnrollmentTable from '../../../shared/components/EnrollmentTable';
import { Helmet } from 'react-helmet-async';

const AdminCourseEnrollments = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useCourseEnrollmentsAdmin(courseId!);
  const enrollments = Array.isArray(data?.data) ? data?.data : data?.data?.enrollments || [];

  return (
    <>
      <Helmet>
        <title>Course Enrollments | Admin | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Course Enrollments</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading enrollments: {error.message}</div>
        ) : (
          <EnrollmentTable enrollments={enrollments} showUser />
        )}
      </div>
    </>
  );
};

export default AdminCourseEnrollments; 