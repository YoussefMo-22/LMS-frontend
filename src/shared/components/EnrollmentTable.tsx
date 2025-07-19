import React from "react";
import type { Enrollment } from "../../features/courses/types/enrollment";

interface EnrollmentTableProps {
  enrollments: Enrollment[];
  showCourse?: boolean;
  showUser?: boolean;
}

const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ enrollments, showCourse = true, showUser = true }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Enrollment ID</th>
            {showUser && <th className="p-2 text-left">User</th>}
            {showCourse && <th className="p-2 text-left">Course</th>}
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enroll) => (
            <tr key={enroll._id} className="border-b">
              <td className="p-2">{enroll._id}</td>
              {showUser && (
                <td className="p-2">
                  {typeof enroll.user_id === 'object' ? (
                    <div>
                      <div className="font-semibold">{enroll.user_id.name}</div>
                      <div className="text-xs text-gray-500">{enroll.user_id.email}</div>
                    </div>
                  ) : (
                    enroll.user_id
                  )}
                </td>
              )}
              {showCourse && (
                <td className="p-2">
                  {typeof enroll.course_id === 'object' ? (
                    <div>
                      <div className="font-semibold">{enroll.course_id.title}</div>
                      <div className="text-xs text-gray-500">{enroll.course_id._id}</div>
                    </div>
                  ) : (
                    enroll.course_id
                  )}
                </td>
              )}
              <td className="p-2">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable; 