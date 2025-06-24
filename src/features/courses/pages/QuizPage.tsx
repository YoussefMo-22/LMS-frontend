import QuizLayout from "../components/QuizLayout";
import LessonSidebarAccordion from "../components/LessonAccordion";
import CourseInstructor from "../components/CourseInstructor";
import ButtonUI from "../../../shared/components/UI/Button";

export default function QuizPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6 container mx-auto">
      {/* Left Column */}
      <div className="lg:col-span-9">
        <QuizLayout />
        <div className="flex justify-between mt-8">
        <ButtonUI className="bg-white border border-primary-400 px-8 text-primary-400">Previous Lesson</ButtonUI>
        <ButtonUI className="bg-primary-400 px-8 text-white">Next Lesson</ButtonUI>
        </div>
        <CourseInstructor />
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3">
        <LessonSidebarAccordion />
      </div>
    </div>
  );
}
