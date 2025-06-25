import VideoPlayer from "../components/VideoPlayer";
import CourseDescription from "../components/LessonDescription";
import CourseInstructor from "../components/CourseInstructor";
import LiveChat from "../components/LiveChat";

export default function CourseLivePage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Side */}
            <div className="lg:col-span-2 space-y-6">
                <VideoPlayer />
                <CourseDescription />
                <CourseInstructor
                />

            </div>

            {/* Right Side */}
            <div className="space-y-4">
                <LiveChat />
            </div>
        </div>
    );
}
