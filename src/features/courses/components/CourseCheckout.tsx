import course from "../../../assets/course.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import book3 from "../../../assets/book3.svg";
import clock from "../../../assets/clock.svg";
import mobile from "../../../assets/mobile.svg";
import cup from "../../../assets/cup.svg";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCheckout() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/checkout`); // dynamically go to course
  };
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="border rounded-xl p-4 shadow-md space-y-4">
      <img src={course} alt="Course Preview" className="rounded-lg" />
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary-600">$49.99 <span className="line-through text-gray-400 ml-2">$60.00</span></p>
        <p className="text-sm text-red-500 font-medium">25% off</p>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <button onClick={handleContinue} className="w-full bg-primary-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-primary-600 transition">
          <FontAwesomeIcon icon={faCartShopping} />
          Add to Cart
        </button>
        <button
          className="p-2 bg-primary-100 text-primary-300 rounded hover:bg-primary-200 transition"
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          <Heart
            fill={isFavorite ? "#1b347c" : "none"} // Tailwind's red-500
            color={isFavorite ? "#1b347c" : "currentColor"}
          />
        </button>
      </div>
      <ul className="text-sm text-gray-600 space-y-3 pt-2 border-t">
        <li><div className="flex items-center gap-2 text-primary-400"><img src={book3} alt="" /> 42 lessons</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={clock} alt="" /> 6 hours total</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={mobile} alt="" /> Access on mobile and desktop</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={cup} alt="" /> Certificate of completion</div></li>
      </ul>
    </div>
  );
}
