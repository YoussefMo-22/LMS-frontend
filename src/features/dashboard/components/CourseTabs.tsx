import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["All", "Published", "In Progress", "Rejected"];

const CourseTabs = () => {
  const [active, setActive] = useState("All");
  const navigate = useNavigate();
  const handleAddCourse = () => navigate("?modal=add");

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 bg-gray-100 p-1 rounded-md" role="tablist" aria-label="Course tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative px-4 py-2 rounded-md font-medium z-10 ${active === tab ? "bg-white shadow text-primary-500" : "text-gray-600"}`}
            role="tab"
            aria-selected={active === tab}
            aria-controls={`tabpanel-${tab}`}
            id={`tab-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') {
                setActive(tabs[(idx + 1) % tabs.length]);
              } else if (e.key === 'ArrowLeft') {
                setActive(tabs[(idx - 1 + tabs.length) % tabs.length]);
              }
            }}
          >
            {tab}
            {active === tab && (
              <motion.div
                layoutId="tab"
                className="absolute inset-0 rounded-md bg-white -z-30"
              />
            )}
          </button>
        ))}
      </div>
      <ButtonUI className="bg-dark-800 hover:bg-dark-900 text-white" onClick={handleAddCourse}>
        + Add New Course
      </ButtonUI>
    </div>
  );
};

export default CourseTabs;