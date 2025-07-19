import AdminCourseList from '../components/AdminCourseList';
import AdminAddEditCourseModal from '../components/AdminAddEditCourseModal';
import { Helmet } from 'react-helmet-async';

const AdminCourses = () => {
  return (
    <>
      <Helmet>
        <title>Admin Courses | LevelUp LMS</title>
        <meta name="description" content="Manage all courses as an admin on LevelUp LMS." />
      </Helmet>
      <AdminAddEditCourseModal />
      <AdminCourseList />
    </>
  );
};

export default AdminCourses; 