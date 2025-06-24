import { useState } from "react";
import { ChevronDown } from "lucide-react";

const modules = [
  {
    title: "Introduction to React",
    duration: "45 min",
    lessons: [
      "What is React?",
      "JSX & Rendering",
      "Components & Props",
      "State & Lifecycle",
    ],
  },
  {
    title: "React Fundamentals",
    duration: "60 min",
    lessons: [
      "Hooks Overview",
      "useState & useEffect",
      "Handling Events",
      "Forms in React",
    ],
  },
  {
    title: "Advanced React",
    duration: "90 min",
    lessons: [
      "Context API",
      "Custom Hooks",
      "Performance Optimization",
      "Testing Components",
    ],
  },
];

export default function CourseContentAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-primary-400 font-semibold mb-4">Course Content</h2>
      <p className="text-gray-600 text-sm mb-4">
        {modules.length} modules • 45 lessons • 5h 35m total duration
      </p>

      <div className="border rounded-md overflow-hidden divide-y">
        {modules.map((module, index) => (
          <div key={index}>
            {/* Module Header */}
            <button
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-left">{module.title}</span>
              <span className="flex items-center gap-2 text-sm text-gray-500">
                {module.lessons.length} lessons • {module.duration}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            {/* Lessons */}
            {openIndex === index && (
              <ul className="px-4 py-2 space-y-2 text-sm text-gray-700 bg-white">
                {module.lessons.map((lesson, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b border-gray-200 pb-1"
                  >
                    <span>{lesson}</span>
                    <span>5 min</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
