import ReactPlayer from 'react-player';
import { useMarkLessonComplete } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';
import QuizCard from './QuizCard';
import AssignmentCard from './AssignmentCard';

interface LessonContentProps {
  lesson: any;
  loading: boolean;
  onComplete: () => void;
}

export default function LessonContent({ lesson, loading, onComplete }: LessonContentProps) {
  const markCompleteMutation = useMarkLessonComplete();

  const handleMarkComplete = async () => {
    await markCompleteMutation.mutateAsync(lesson._id);
    onComplete();
  };

  if (loading) {
    return <LoadingSpinner text="Loading lesson..." />;
  }

  if (!lesson) {
    return <div className="text-red-500">Lesson not found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
      {lesson.videoUrl && (
        <div className="mb-4">
          <ReactPlayer url={lesson.videoUrl} controls width="100%" height="360px" />
        </div>
      )}
      <div className="mb-4">{lesson.description}</div>
      {lesson.resources && lesson.resources.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="list-disc pl-6">
            {lesson.resources.map((res: any, idx: number) => (
              <li key={idx}>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 underline">
                  {res.name || res.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition mb-4"
        onClick={handleMarkComplete}
        disabled={lesson.isCompleted || markCompleteMutation.isPending}
      >
        {lesson.isCompleted ? 'Completed' : markCompleteMutation.isPending ? 'Marking...' : 'Mark as Complete'}
      </button>
      {/* Quiz and Assignment */}
      {lesson.quizId && <QuizCard quizId={lesson.quizId} />}
      {lesson.assignmentId && <AssignmentCard assignmentId={lesson.assignmentId} />}
    </div>
  );
} 