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
  // Add more modules...
];

export default function CourseContentAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
      <p className="text-gray-600 text-sm mb-4">{modules.length} modules • 45 lessons • 5h 35m total duration</p>

      {modules.map((module, index) => (
        <div key={index} className="border rounded-md mb-4">
          <button
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-medium"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>{module.title}</span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              {module.lessons.length} lessons • {module.duration} <ChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </span>
          </button>
          {openIndex === index && (
            <ul className="p-4 space-y-2 text-sm text-gray-600">
              {module.lessons.map((lesson, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{lesson}</span>
                  <span>5 min</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
