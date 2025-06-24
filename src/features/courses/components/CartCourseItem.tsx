import { Trash2 } from "lucide-react";

type Props = {
    course: {
        id: number;
        title: string;
        instructor: string;
        price: number;
        originalPrice: number;
        rating: number;
        image: string;
    };
    onRemove: (id: number) => void;
};

export default function CartCourseItem({ course, onRemove }: Props) {
    return (
        <div className="flex gap-4 border-b py-4">
            <img src={course.image} alt={course.title} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">By {course.instructor}</p>
                <p className="text-sm text-yellow-500 font-semibold">⭐ {course.rating}</p>
            </div>
                <div className="flex flex-col justify-center items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary-500">${course.price.toFixed(2)}</span>
                    <span className="text-sm line-through text-gray-400">${course.originalPrice.toFixed(2)}</span>
                </div>
            <div className="flex flex-col justify-center items-center">
                <button onClick={() => onRemove(course.id)} className="text-red-500 rounded-xl bg-red-200 p-3 hover:text-red-700">
                <Trash2 />
            </button>
            </div>
        </div>
    );
}
