import React, { useState } from "react";
import { useAllPayments } from '../../courses/hooks/usePayment';
import { Helmet } from 'react-helmet-async';

const AdminPayments = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('payment_date,-amount');
  const { data, isLoading, error } = useAllPayments({ page, limit, sort });
  const payments = data?.data?.payments || [];

  return (
    <>
      <Helmet>
        <title>Payments | Admin | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Payments</h1>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading payments: {error.message}</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Payment ID</th>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">Student</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-2 font-mono">{p._id}</td>
                  <td className="p-2">{typeof p.course_id === 'object' ? p.course_id.title : p.course_id}</td>
                  <td className="p-2">{p.student_id}</td>
                  <td className="p-2">${p.amount}</td>
                  <td className="p-2">{p.payment_method}</td>
                  <td className="p-2">{p.payment_date?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination */}
        <div className="mt-6 flex gap-2 items-center">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 rounded bg-gray-200">Prev</button>
          <span>Page {page}</span>
          <button disabled={payments.length < limit} onClick={() => setPage(page + 1)} className="px-3 py-1 rounded bg-gray-200">Next</button>
        </div>
      </div>
    </>
  );
};

export default AdminPayments; 