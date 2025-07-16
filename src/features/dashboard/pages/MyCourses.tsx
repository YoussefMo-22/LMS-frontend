import AddEditCourseModal from "../components/AddEditCourseModel";
import { useSearchParams } from "react-router-dom";
import CourseTabs from "../components/CourseTabs";
import CourseList from "../components/CourseList";
import { Helmet } from 'react-helmet-async';

const MyCourses = () => {
  const [searchParams] = useSearchParams();
  const isModalOpen = searchParams.get("modal");

  return (
    <>
      <Helmet>
        <title>My Courses | LevelUp LMS</title>
        <meta name="description" content="View and manage all your enrolled and created courses on your LevelUp LMS dashboard." />
      </Helmet>
      <div className="p-6 flex flex-col gap-6">
        <CourseTabs />
        <CourseList />
        {isModalOpen && <AddEditCourseModal />}
      </div>
    </>
  );
};
export default MyCourses;