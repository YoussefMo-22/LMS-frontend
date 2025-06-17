import education from "../../../assets/education.svg";
import ai from "../../../assets/ai.svg";
import game from "../../../assets/game.svg";
import roles from "../../../assets/roles.svg";
import verified from "../../../assets/verified.svg";
import chooseImg from "../../../assets/chooseImg.png";
import ButtonUI from "../../../shared/components/UI/Button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function ChooseSection() {
  const chooses = [
    { text: "Seamless Online Learning Experience", icon: education },
    { text: "AI-Powered Course Recommendations", icon: ai },
    { text: "Gamified Learning with Badges & Certificates", icon: game },
    { text: "Supports Students, Instructors, Admins & Organizations", icon: roles },
    { text: "Custom-Branded LMS Solutions for Enterprises", icon: verified },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 order-2 md:order-1">
          <h2 className="text-4xl font-bold mb-6 text-primary-400">
            Why Choose LevelUp?
          </h2>
          <p className="text-lg text-primary-400 mb-6">
            Our Learning Management System offers interactive courses that engage learners and foster knowledge retention. With built-in progress tracking and certification options, you can easily monitor achievements and motivate users.
          </p>

          <ul className="space-y-4">
            {chooses.map((choose, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-2 border-primary-400 p-4 rounded-lg hover:bg-primary-100 transition"
              >
                <img
                  src={choose.icon}
                  alt={`${choose.text} icon`}
                  className="w-8 h-8"
                  loading="lazy"
                />
                <span className="text-lg text-gray-700">{choose.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <ButtonUI className="text-white px-16 bg-primary-400">
              Learn More
            </ButtonUI>
            <Link
              to="/register"
              className="text-primary-400 font-semibold flex items-center gap-1"
            >
              Sign Up <ChevronRight />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center order-1 md:order-2">
          <img
            src={chooseImg}
            alt="Students engaging with LMS platform"
            className="w-full max-w-md md:max-w-lg object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default ChooseSection;
