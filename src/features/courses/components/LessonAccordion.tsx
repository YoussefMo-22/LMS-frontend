import { useState } from "react";
import { ChevronDown } from "lucide-react";
import mark from "../../../assets/mark.svg";

const data = [
  {
    title: "Introduction to React",
    duration: "10:00",
    items: [
      { title: "What is React?", duration: "10:00", completed: true },
      { title: "React Fundamentals Quiz", duration: "5:00", completed: false },
      { title: "What is React?", duration: "10:00", completed: false },
    ],
  },
  {
    title: "React Basics",
    duration: "10:00",
    items: [
      { title: "JSX and Rendering", duration: "8:00", completed: false },
      { title: "State Management", duration: "7:00", completed: false },
    ],
  },
];

export default function LessonAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      {data.map((section, idx) => (
        <div key={idx} className="mb-2">
          <button
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIndex(openIndex === idx ? -1 : idx);
              }
            }}
            role="button"
            aria-expanded={openIndex === idx}
            aria-controls={`accordion-panel-${idx}`}
            id={`accordion-header-${idx}`}
            tabIndex={0}
          >
            <span className="font-medium text-left">{section.title}</span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              {section.duration}
              <ChevronDown
                className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          {/* Lessons */}
          {openIndex === idx && (
            <ul
              className="px-4 py-2 space-y-2 text-sm text-gray-700 bg-white"
              role="region"
              aria-labelledby={`accordion-header-${idx}`}
              id={`accordion-panel-${idx}`}
            >
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-gray-200 pb-1"
                >
                  <span>{item.title}</span>
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
