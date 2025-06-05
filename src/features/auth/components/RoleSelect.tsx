import studentIcon from "../../../assets/student.svg";
import instructorIcon from "../../../assets/instructor.svg";
import organizationIcon from "../../../assets/organization.svg";
import adminIcon from "../../../assets/admin.svg";
import arrow from "../../../assets/arrow-down.svg";
import { useState } from "react";

const roles = [
  {
    value: "student",
    label: "Student",
    icon: studentIcon,
  },
  {
    value: "instructor",
    label: "Instructor",
    icon: instructorIcon,
  },
  {
    value: "organization",
    label: "Organization",
    icon: organizationIcon,
  },
  {
    value: "admin",
    label: "Admin",
    icon: adminIcon,
  },
];

export default function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedRole = roles.find((r) => r.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-dark-400 text-white border-2 border-primary-400 rounded-xl px-4 py-3 text-sm focus:outline-none "
      >
        {selectedRole ? (
          <div className="flex items-center gap-2">
            <img src={selectedRole.icon} alt={selectedRole.label} className="w-5 h-5" />
            <span>{selectedRole.label}</span>
          </div>
        ) : (
          <span className="text-white">Select Role</span>
        )}
        <img src={arrow} alt="" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 text-white bg-dark-400 border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {roles.map((role) => (
            <li
              key={role.value}
              onClick={() => {
                onChange(role.value);
                setIsOpen(false);
              }}
              className="px-4 py-2 border-b border-gray-700 hover:text-secondary-400 flex items-center gap-2 cursor-pointer text-sm"
            >
              <img src={role.icon} alt={role.label} className="w-5 h-5" />
              <span>{role.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
