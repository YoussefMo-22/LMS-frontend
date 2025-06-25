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
            className="w-full flex justify-between items-center font-medium px-2 py-3 bg-gray-50 rounded"
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          >
            <span>{section.title}</span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              {section.duration}
              <ChevronDown className={`${openIndex === idx ? "rotate-180" : ""} transition`} />
            </span>
          </button>
          {openIndex === idx && (
            <ul className="mt-2 space-y-2">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-2 py-1 border rounded text-sm"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{item.duration}</span>
                    {item.completed && (
                      <img src={mark} className="w-4 h-4" alt="" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
