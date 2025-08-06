import { ArrowRight } from "lucide-react";
// import InputUI from "../../shared/components/UI/Input";
import ButtonUI from "../../shared/components/UI/Button";
import EnrolledCourseCard from "../../shared/components/EnrolledCourseCard";
import { Link } from "react-router-dom";
import EnrolledCourse from "../../shared/components/EnrolledCourse";
import QuizCard from "../../shared/components/QuizCard";
// import CourseCard from "../../shared/components/CourseCard";
import { useAuth } from "../auth/context/AuthContext";

function HomePage() {
      const { user } = useAuth();
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Search Input */}
                {/* <div>
                    <InputUI
                        type={"search"}
                        placeholder={"Search for courses, topics, instructors…"}
                        icon={<Search color="#1e3a8a" />}
                    />
                </div> */}

                {/* Welcome Section */}
                <div className="mt-8 py-10 px-6 bg-primary-400 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="text-white space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold">Welcome Back, {user?.name}!</h2>
                        <p className="text-sm md:text-base">
                            Ready to continue your learning journey? You're doing great!
                        </p>
                    </div>
                    <ButtonUI className="bg-white text-primary-400 hover:bg-primary-100 whitespace-nowrap">
                        Explore New Courses
                    </ButtonUI>
                </div>

                {/* Continue Learning Section */}
                <div className="my-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h2 className="text-2xl md:text-4xl font-bold lineHeader relative">Continue Learning</h2>
                        <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>
                            View All <ArrowRight />
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <EnrolledCourseCard />
                        <EnrolledCourseCard />
                        <EnrolledCourseCard />
                    </div>
                </div>

                {/* Enrolled Courses (Progress) */}
                <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnrolledCourse />
                    <EnrolledCourse />
                </div>

                {/* Tasks Section */}
                <div className="my-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h2 className="text-2xl md:text-4xl font-bold lineHeader relative">Your Tasks</h2>
                        <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>
                            View All <ArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                    </div>
                </div>

                {/* Recommended Courses */}
                <div className="my-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h2 className="text-2xl md:text-4xl font-bold lineHeader relative">Recommended for You</h2>
                        <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>
                            View All <ArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {/* <CourseCard
                            id={1}
                            title="The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ..."
                            instructor="Dr. Angela Yu"
                            price={499.99}
                            originalPrice={599.99}
                            rating={4}
                        />
                        <CourseCard
                            id={1}
                            title="The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ..."
                            instructor="Dr. Angela Yu"
                            price={499.99}
                            originalPrice={599.99}
                            rating={4}
                        />
                        <CourseCard
                            id={1}
                            title="The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ..."
                            instructor="Dr. Angela Yu"
                            price={499.99}
                            originalPrice={599.99}
                            rating={4}
                        /> */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
