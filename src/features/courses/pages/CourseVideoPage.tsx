import VideoPlayer from "../components/VideoPlayer";
import LessonDescription from "../components/LessonDescription";
import CourseInstructor from "../components/CourseInstructor";
import ResourcesList from "../components/ResourcesList";
import LessonAccordion from "../components/LessonAccordion";

export default function CourseVideoPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 p-6 container mx-auto">
      {/* Left Side: Main Content */}
      <div className="xl:col-span-3 space-y-6">
        <VideoPlayer />
        <LessonDescription />
        <CourseInstructor />
        <ResourcesList />
      </div>

      {/* Right Side: Lessons Accordion */}
      <div className="xl:col-span-1">
        <LessonAccordion />
      </div>
    </div>
  );
}
