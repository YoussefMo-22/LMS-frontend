import { useAllEnrollmentsAdmin } from '../../courses/hooks/useEnrollment';
import EnrollmentTable from '../../../shared/components/EnrollmentTable';
import { Helmet } from 'react-helmet-async';

const AdminEnrollments = () => {
  const { data, isLoading, error } = useAllEnrollmentsAdmin();
  
  // Handle the union type properly
  const enrollments = data?.data 
    ? 'enrollments' in data.data 
      ? data.data.enrollments 
      : data.data
    : [];

  return (
    <>
      <Helmet>
        <title>All Enrollments | Admin | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Enrollments</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading enrollments: {error.message}</div>
        ) : (
          <EnrollmentTable enrollments={enrollments} showCourse showUser />
        )}
      </div>
    </>
  );
};

export default AdminEnrollments; 