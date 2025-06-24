import CourseCard from "../../../shared/components/CourseCard";

const courses = [1, 2, 3]; // Dummy data or from API

export default function YouMightAlsoLike() {
  return (
    <div>
      <h2 className="text-2xl text-primary-400 font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((_, index) => (
          <CourseCard key={index} />
        ))}
      </div>
    </div>
  );
}
