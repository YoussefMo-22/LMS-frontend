import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetails, useCourseLessons, useLesson } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';
import CourseCheckout from '../components/CourseCheckout';
import CourseSidebar from '../components/CourseSidebar';
import LessonContent from '../components/LessonContent';
import CourseReviews from '../components/CourseReviews';
import CertificateSection from '../components/CertificateSection';
import LiveSessionsList from '../components/LiveSessionsList';
import QuizzesList from '../components/QuizzesList';
import { Helmet } from 'react-helmet-async';

export default function CourseDetails() {
  const { id: courseId } = useParams<{ id: string }>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
    refetch: refetchCourse,
  } = useCourseDetails(courseId!);

  const {
    data: lessonsData,
    isLoading: lessonsLoading,
    isError: lessonsError,
    refetch: refetchLessons,
  } = useCourseLessons(courseId!);

  // Fetch selected lesson content
  const {
    data: lessonData,
    isLoading: lessonLoading,
    isError: lessonError,
  } = useLesson(selectedLessonId || '');

  if (courseLoading || lessonsLoading) {
    return <LoadingSpinner text="Loading course..." size="lg" className="min-h-[400px]" />;
  }

  if (courseError || lessonsError || !courseData) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Error loading course details. Please try again later.
      </div>
    );
  }

  // Use courseData.data for all course fields
  const course = courseData.data;
  const isEnrolled = 'isEnrolled' in course ? !!(course as any).isEnrolled : false;
  const price = course.price || 0;

  // Lessons and progress
  const lessons = lessonsData.data.lessons || [];
  const completedCount = lessons.filter((l: any) => l.isCompleted).length;
  const progress = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  // Default to first lesson if none selected
  const currentLessonId = selectedLessonId || (lessons[0]?._id ?? null);

  const courseTitle = course.title || 'Course Details';
  const courseDesc = course.description || 'View course details, lessons, and enroll on LevelUp LMS.';
  const courseUrl = `https://your-lms-domain.com/course/${courseId}`;
  const instructorName = typeof course.instructor === 'object' && course.instructor?.name ? course.instructor.name : 'Instructor';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseTitle,
    description: courseDesc,
    provider: {
      '@type': 'Organization',
      name: 'LevelUp LMS',
      sameAs: 'https://your-lms-domain.com/'
    },
    url: courseUrl,
    instructor: {
      '@type': 'Person',
      name: instructorName
    }
  };

  return (
    <>
      <Helmet>
        <title>{courseTitle} | LevelUp LMS</title>
        <meta name="description" content={courseDesc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="p-0 md:p-10 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-0 md:gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full md:sticky md:top-10 h-fit md:h-[calc(100vh-80px)]">
          <CourseSidebar
            lessons={lessons}
            currentLessonId={currentLessonId}
            onLessonSelect={setSelectedLessonId}
            progress={progress}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Course Info & Lesson Content */}
            <div className="md:col-span-2 space-y-6">
              {/* CourseHeader, Instructor, etc. */}
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                {/* Instructor, rating, etc. */}
              </div>
              {/* Lesson Content */}
              <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
                <LessonContent
                  lesson={lessonData?.data}
                  loading={lessonLoading}
                  onComplete={refetchLessons}
                />
              </div>
              {/* Upcoming Live Sessions */}
              <LiveSessionsList courseId={courseId!} />
              {/* Course Quizzes */}
              <QuizzesList courseId={courseId!} />
            </div>

            {/* Right Column: Checkout/Progress */}
            <div className="md:col-span-1">
              <CourseCheckout
                courseId={courseId!}
                price={price}
                isEnrolled={isEnrolled}
                onEnrolled={refetchCourse}
              />
            </div>
          </div>

          {/* Reviews and Certificate */}
          <div className="mt-16">
            <CourseReviews courseId={courseId!} isEnrolled={isEnrolled} />
            <CertificateSection courseId={courseId!} progress={progress} isEnrolled={isEnrolled} />
          </div>
        </div>
      </div>
    </>
  );
}
