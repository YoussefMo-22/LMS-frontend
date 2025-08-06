import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";

const EnrollSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Enrollment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your payment. You are now enrolled in the course.</p>
      <ButtonUI className="bg-primary-500 text-white px-6 py-2 rounded" onClick={() => navigate("/dashboard/courses")}>Go to My Courses</ButtonUI>
    </div>
  );
};

export default EnrollSuccess; 