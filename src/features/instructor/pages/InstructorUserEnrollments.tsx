import { useParams } from 'react-router-dom';
import { useUserEnrollmentsInstructor } from '../../courses/hooks/useEnrollment';
import EnrollmentTable from '../../../shared/components/EnrollmentTable';
import { Helmet } from 'react-helmet-async';

const InstructorUserEnrollments = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, error } = useUserEnrollmentsInstructor(userId!);
  const enrollments = Array.isArray(data?.data) ? data?.data : data?.data?.enrollments || [];

  return (
    <>
      <Helmet>
        <title>User Enrollments | Instructor | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Enrollments</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading enrollments: {error.message}</div>
        ) : (
          <EnrollmentTable enrollments={enrollments} showCourse />
        )}
      </div>
    </>
  );
};

export default InstructorUserEnrollments; 