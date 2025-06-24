import course from '../../assets/course.png';
import profile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonUI from './UI/Button';
import { useNavigate } from 'react-router-dom';

function EnrolledCourseCard() {
    const progress = 65; // example progress percentage};
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate(`/course/lesson/1`); // dynamically go to course
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4">
            <img src={course} alt="course" className="w-full h-52 object-cover" />

            <div className="p-4 flex flex-col gap-3 h-full">
                <h3 className="text-xl font-bold text-primary-400 line-clamp-2">
                    The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ...
                </h3>

                <div className="flex gap-2 justify-between items-center">
                    <div className="flex items-center gap-3 mt-2">
                        <img src={profile} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                        <p className="text-lg font-medium">Dr. Angela Yu</p>
                    </div>
                    <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                        ))}
                        <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                    </div>
                </div>



                {/* Progress Bar */}
                <div className='flex items-center justify-between text-primary-400 text-sm'>
                    <p>32/42 lessons</p>
                    <p className="text-sm text-muted-foreground">{progress}% completed</p>
                </div>
                <div className="w-full bg-secondary-400 rounded-full h-3">
                    <div
                        className="bg-primary-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <hr />
                <ButtonUI onClick={handleContinue} className="w-full mt-auto bg-transparent border-2 border-primary-400  text-primary-400 hover:bg-primary-100">
                    Continue Course
                </ButtonUI>

            </div>
        </div>
    );
}

export default EnrolledCourseCard;
