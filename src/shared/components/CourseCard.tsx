import course from '../../assets/course.png';
import profile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonUI from './UI/Button';
import { useNavigate } from 'react-router-dom';

function CourseCard() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate(`/course/1`); // dynamically go to course
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4">
            <img src={course} alt="course" className="w-full h-52 object-cover " />
            <div className='p-4 flex flex-col gap-2 h-full'>
                <h3 className="text-xl font-bold text-primary-400 line-clamp-2">
                    The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ...
                </h3>

                <div className="flex items-center gap-3 mt-2">
                    <img src={profile} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                    <p className="text-lg font-medium">Dr. Angela Yu</p>
                </div>
                <hr />
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                    </div>
                    <p className="text-base font-semibold text-dark-400">
                        $499.99 <span className="line-through text-gray-400 text-sm ml-1">$560.99</span>
                    </p>
                </div>

                <ButtonUI onClick={handleContinue} className="w-full mt-auto text-white"><span><FontAwesomeIcon icon={faCartShopping} className="mr-2" /></span>Add To Cart</ButtonUI>
            </div>
        </div>
    );
}

export default CourseCard;
