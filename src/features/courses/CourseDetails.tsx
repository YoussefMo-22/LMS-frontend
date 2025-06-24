import CourseHeader from "./components/CourseHeader";
import CourseInstructor from "./components/CourseInstructor";
import CourseContentAccordion from "./components/CourseContentAccordion";
import CourseCheckout from "./components/CourseCheckout";
import YouMightAlsoLike from "./components/YouMightAlsoLike";

export default function CourseDetails() {
  return (
    <div className="p-6 md:p-10 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <CourseHeader />
          <CourseInstructor />
          <CourseContentAccordion />
        </div>

        {/* Right Column */}
        <div className="md:col-span-1">
          <CourseCheckout />
        </div>
      </div>

      {/* Related Courses */}
      <div className="mt-16">
        <YouMightAlsoLike />
      </div>
    </div>
  );
}
