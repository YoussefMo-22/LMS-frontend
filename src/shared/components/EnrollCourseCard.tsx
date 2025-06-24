import course from '../../assets/course.png';
import profile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonUI from './UI/Button';

function EnrollCourseCard() {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4">
            <img src={course} alt="course" className="w-full h-52 object-cover " />
            <div className='p-4 flex flex-col gap-2 h-full'>
                <h3 className="text-xl font-bold text-primary-400 line-clamp-2">
                    The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ...
                </h3>
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex items-center gap-3 mt-2">
                        <img src={profile} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                        <p className="text-lg  font-medium">Dr. Angela Yu</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                    </div>
                </div>
                <hr />

                <ButtonUI className="w-full mt-auto text-primary-400 bg-transparent border-2 border-primary-400">Enroll Course</ButtonUI>
            </div>
        </div>
    );
}

export default EnrollCourseCard;
