import courses from "../../../assets/amico.png"
import students from "../../../assets/studentsamico.png"
import assignments from "../../../assets/assignmentamico.png"
import earnings from "../../../assets/earningamico.png"
const CourseStats = () => {
    const stats = [
        { label: "Total Courses", value: 25, image: courses },
        { label: "Total Students", value: 25, image: students },
        { label: "Pending Assignments", value: 25, image: assignments },
        { label: "Total Earnings", value: "$2,340", image: earnings },
    ];
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
                    <p className="text-lg font-semibold text-gray-500">{stat.label}</p>
                    <img src={stat.image} alt={stat.label} className=" mx-auto my-2" />
                    <h2 className="text-4xl font-bold text-primary-400 mt-2">{stat.value}</h2>
                </div>
            ))}
        </div>
    );
};

export default CourseStats;