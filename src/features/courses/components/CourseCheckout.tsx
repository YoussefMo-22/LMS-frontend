import course from "../../../assets/course.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import book3 from "../../../assets/book3.svg";
import clock from "../../../assets/clock.svg";
import mobile from "../../../assets/mobile.svg";
import cup from "../../../assets/cup.svg";

export default function CourseCheckout() {
  return (
    <div className="border rounded-xl p-4 shadow-md space-y-4">
      <img src={course} alt="Course Preview" className="rounded-lg" />
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary-600">$49.99 <span className="line-through text-gray-400 ml-2">$60.00</span></p>
        <p className="text-sm text-red-500 font-medium">25% off</p>
      </div>
      <button className="w-full bg-primary-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-primary-600 transition">
        <FontAwesomeIcon icon={faCartShopping} />
        Add to Cart
      </button>
      <ul className="text-sm text-gray-600 space-y-3 pt-2 border-t">
        <li><div className="flex items-center gap-2 text-primary-400"><img src={book3} alt="" /> 42 lessons</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={clock} alt="" /> 6 hours total</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={mobile} alt="" /> Access on mobile and desktop</div></li>
        <li><div className="flex items-center gap-2 text-primary-400"><img src={cup} alt="" /> Certificate of completion</div></li>
      </ul>
    </div>
  );
}
