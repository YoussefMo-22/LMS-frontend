import { useState } from 'react';

interface Lesson {
  _id: string;
  title: string;
  section?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface CourseSidebarProps {
  lessons: Lesson[];
  currentLessonId: string | null;
  onLessonSelect: (lessonId: string) => void;
  progress: number; // 0-100
}

// Group lessons by section
function groupBySection(lessons: Lesson[]) {
  const sections: Record<string, Lesson[]> = {};
  lessons.forEach(lesson => {
    const section = lesson.section || 'Course Content';
    if (!sections[section]) sections[section] = [];
    sections[section].push(lesson);
  });
  return sections;
}

export default function CourseSidebar({ lessons, currentLessonId, onLessonSelect, progress }: CourseSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const sections = groupBySection(lessons);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-full md:w-72 bg-white border-r rounded-lg shadow-md flex flex-col h-full">
      {/* Progress Bar */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-primary-400">Progress</span>
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-primary-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Sections & Lessons */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(sections).map(([section, lessons]) => (
          <div key={section} className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-primary-500 hover:bg-primary-50 focus:outline-none"
              onClick={() => toggleSection(section)}
            >
              <span>{section}</span>
              <span className={`transform transition-transform ${openSections[section] ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {openSections[section] !== false && (
              <ul className="pl-4 pb-2">
                {lessons.map(lesson => (
                  <li key={lesson._id}>
                    <button
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded text-left transition-colors
                        ${lesson._id === currentLessonId ? 'bg-primary-100 text-primary-700 font-bold' : 'hover:bg-gray-100'}
                        ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !lesson.isLocked && onLessonSelect(lesson._id)}
                      disabled={lesson.isLocked}
                    >
                      <span className={`w-2 h-2 rounded-full ${lesson.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <span className="truncate flex-1">{lesson.title}</span>
                      {lesson.isLocked && <span className="text-xs text-gray-400 ml-2">Locked</span>}
                      {lesson.isCompleted && <span className="text-xs text-green-600 ml-2">Done</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
} 