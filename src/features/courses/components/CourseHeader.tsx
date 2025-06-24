import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import students from "../../../assets/profile-2user.svg";
import calender from "../../../assets/calendar-2.svg";

export default function CourseHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-700">Complete React Developer Course 2025</h1>
      <p className="text-gray-600 mt-2">Master React from basics to advanced concepts. Build real-world projects and become a confident React developer.</p>

      <div className="flex items-center gap-6 text-sm text-primary-400 mt-4">
        <div><FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 4.5 (29,343 ratings)</div>
        <div className="flex items-center gap-1"><img src={students} alt="students" /> 123,123 students</div>
        <div className="flex items-center gap-1"><img src={calender} alt="calendar" /> Last updated 1/2025</div>
      </div>
    </div>
  );
}
