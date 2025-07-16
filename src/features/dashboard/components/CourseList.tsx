import CourseCardDashboard from "./CourseCardDashboard";
import courseImg from "../../../assets/course.png";
import type { CourseStatus } from "../types/index";
import React from "react";

const dummyCourses = [
  {
    id: "1",
    title: "React for Beginners",
    status: "Published" as CourseStatus,
    students: 120,
    image: courseImg,
  },
  {
    id: "2",
    title: "Node.js Masterclass",
    status: "In Progress" as CourseStatus,
    students: 75,
    image: courseImg,
  },
  {
    id: "3",
    title: "Intro to AI",
    status: "Rejected" as CourseStatus,
    students: 40,
    image: courseImg,
  },
];

const CourseList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyCourses.map((course) => (
        <CourseCardDashboard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default React.memo(CourseList);
