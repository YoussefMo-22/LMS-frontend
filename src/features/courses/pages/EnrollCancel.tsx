import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";

const EnrollCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6">Your payment was cancelled or failed. You have not been enrolled in the course.</p>
      <ButtonUI className="bg-primary-500 text-white px-6 py-2 rounded" onClick={() => navigate("/courses")}>Browse Courses</ButtonUI>
    </div>
  );
};

export default EnrollCancel; 