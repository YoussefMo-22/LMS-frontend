import { useNavigate } from 'react-router-dom';
import course from '../../assets/course.png';
import ButtonUI from './UI/Button';

function QuizCard() {
      const navigate = useNavigate();

    const handleContinue = () => {
        navigate(`/quiz/1`); // dynamically go to course
    };
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg overflow-hidden p-4 gap-4">
      
      {/* Left - Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img src={course} alt="Course" className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Middle - Titles */}
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-semibold text-sm text-gray-600 line-clamp-1">UI/UX Design</h3>
        <p className="line-clamp-1">UX Design Quiz</p>
      </div>

      {/* Right - Start Button */}
      <div>
        <ButtonUI onClick={handleContinue} className="bg-primary-400 text-white px-9 py-2 hover:bg-primary-500 transition rounded-md">
          Start
        </ButtonUI>
      </div>
    </div>
  );
}

export default QuizCard;
