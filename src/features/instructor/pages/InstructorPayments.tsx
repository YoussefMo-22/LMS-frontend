import React from "react";
import { useInstructorEnrollments } from '../../courses/hooks/usePayment';
import { Helmet } from 'react-helmet-async';

const InstructorPayments = () => {
  const { data, isLoading, error } = useInstructorEnrollments();
  const enrollments = data?.data?.enrollments || [];

  return (
    <>
      <Helmet>
        <title>Enrollments | Instructor | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Course Enrollments</h1>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading enrollments: {error.message}</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Enrollment ID</th>
                <th className="p-2 text-left">Student</th>
                <th className="p-2 text-left">Course</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e._id} className="border-b">
                  <td className="p-2 font-mono">{e._id}</td>
                  <td className="p-2">{e.user?.name}</td>
                  <td className="p-2">{e.course?.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default InstructorPayments; 