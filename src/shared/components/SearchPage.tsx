import { useLocation } from "react-router-dom";
import CourseCard from "./CourseCard";

const staticCourses = [
    {
        id: 1,
        name: "React for Beginners",
        instructor: "Youssef Mohamed",
    },
    {
        id: 2,
        name: "Advanced JavaScript",
        instructor: "Dr. Angela Yu",
    },
    {
        id: 3,
        name: "Full Stack Web Development",
        instructor: "Eng. Soliman Ragab",
    },
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery().get("query") || "";

    const filteredCourses = staticCourses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-500">Search Results for: <span className="text-dark-500">{query}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(() => (
                        <CourseCard
                            id={1}
                            title="The Complete Full-Stack Web Development Bootcamp Become a Full-Stack Web Developer ..."
                            instructor="Dr. Angela Yu"
                            price={499.99}
                            originalPrice={599.99}
                            rating={4}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No courses matched your search.</p>
                )}
            </div>
        </div>
    );
}
