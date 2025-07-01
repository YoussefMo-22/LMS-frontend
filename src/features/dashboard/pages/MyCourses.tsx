import AddEditCourseModal from "../components/AddEditCourseModel";
import { useSearchParams } from "react-router-dom";
import CourseTabs from "../components/CourseTabs";
import CourseList from "../components/CourseList";

const MyCourses = () => {
  const [searchParams] = useSearchParams();
  const isModalOpen = searchParams.get("modal");

  return (
    <div className="p-6 flex flex-col gap-6">
      <CourseTabs />
      <CourseList />
      {isModalOpen && <AddEditCourseModal />}
    </div>
  );
};
export default MyCourses;