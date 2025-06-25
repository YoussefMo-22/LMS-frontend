import EnrolledCourseCard from "../../../shared/components/EnrolledCourseCard"


function Courses() {
    return (
        <div className="container mx-auto py-8">
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
            <EnrolledCourseCard />
        </div>
        </div>
    )
}

export default Courses