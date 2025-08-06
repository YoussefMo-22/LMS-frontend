import { useNavigate } from "react-router-dom";
import ButtonUI from "./UI/Button";

const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Not Authorized</h1>
      <p className="text-lg text-gray-700 mb-6">You do not have permission to access this page.</p>
      <ButtonUI className="bg-primary-500 text-white px-6 py-2 rounded" onClick={() => navigate("/")}>Go to Home</ButtonUI>
    </div>
  );
};

export default NotAuthorized; 