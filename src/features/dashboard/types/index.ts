export type CourseStatus = "Published" | "In Progress" | "Rejected";

export type Course = {
  id: string;
  title: string;
  status: CourseStatus;
  students: number;
  image: string;
};