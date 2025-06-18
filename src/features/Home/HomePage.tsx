import { ArrowRight, Search } from "lucide-react"
import InputUI from "../../shared/components/UI/Input"
import ButtonUI from "../../shared/components/UI/Button"
import EnrolledCourseCard from "../../shared/components/EnrolledCourseCard"
import { Link } from "react-router-dom"
import EnrolledCourse from "../../shared/components/EnrolledCourse"
import QuizCard from "../../shared/components/QuizCard"
import CourseCard from "../../shared/components/CourseCard"

function HomePage() {
  return (
    <div>
        <div className="container mx-auto py-8">
            <div>
                <InputUI type={"search"} placeholder={"Search for courses, topics, instructors…"} icon={<Search color="#1e3a8a"/>} />
            </div>
            <div className="mt-8 py-16 px-6 bg-primary-400 rounded-2xl flex items-center justify-between">
                <div className="text-white space-y-4">
                    <h2 className="text-3xl font-bold">Welcome Back, Ahmed!</h2>
                    <p>Ready to continue your learning journey? You're doing great!</p>
                </div>
                <ButtonUI className="bg-white text-primary-400 hover:bg-primary-100">Explore New Courses</ButtonUI>
            </div>
            <div className="my-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl relative font-bold lineHeader inline-block">Continue Learning</h2>
                    <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>View All <ArrowRight /></Link>
                </div>
                <div className="flex items-center justify-between space-x-5 mt-8">
                    <EnrolledCourseCard />
                    <EnrolledCourseCard />
                    <EnrolledCourseCard />
                </div>
            </div>
            <div className="my-8 flex items-center justify-between space-x-5">
                <EnrolledCourse />
                <EnrolledCourse />
            </div>
            <div className="my-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl relative font-bold lineHeader inline-block">Your Tasks</h2>
                    <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>View All <ArrowRight /></Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                    <QuizCard />
                </div>
            </div>
            <div className="my-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl relative font-bold lineHeader inline-block">Recommended for You</h2>
                    <Link className="text-primary-400 text-sm flex items-center gap-2" to={''}>View All <ArrowRight /></Link>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage