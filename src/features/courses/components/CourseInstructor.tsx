import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import students from "../../../assets/profile-2user.svg";
import book from "../../../assets/book2.svg";
import profile from "../../../assets/profile.png";

export default function CourseInstructor() {
  return (
    <div className="flex gap-4 mt-6 p-4 border rounded-xl items-center">
      <img src={profile} alt="Instructor" className="w-14 h-14 rounded-full" />
      <div>
        <p className="font-semibold">Sarah Johnson</p>
        <p className="text-sm text-gray-500">Senior React Developer at Tech Corp</p>
        <div className="flex gap-4 mt-1 text-sm text-gray-600">
          <div><FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 4.9 Instructor Rating</div>
          <div className="flex items-center gap-1"><img src={students} alt="students" /> 15,420 Students</div>
          <div className="flex items-center gap-1"><img src={book} alt="courses" /> 8 Courses</div>
        </div>
      </div>
    </div>
  );
}
