import { useState } from "react";
import courseImg from "../../../assets/course.png"
import CartCourseItem from "../components/CartCourseItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet-async';

const dummyCourses = [
    {
        id: 1,
        title: "React Mastery Bootcamp",
        instructor: "Sarah Johnson",
        price: 49.99,
        originalPrice: 60.00,
        rating: 4.6,
        image: courseImg,
    },
    {
        id: 2,
        title: "Advanced Node.js & Express",
        instructor: "John Smith",
        price: 49.99,
        originalPrice: 60.00,
        rating: 4.9,
        image: courseImg,
    },
];

export default function Checkout() {
    const [cartCourses, setCartCourses] = useState(dummyCourses);

    const handleRemove = (id: number) => {
        setCartCourses(prev => prev.filter(c => c.id !== id));
    };

    const handleCheckout = () => {
        toast.success("Checkout is successful!")
    };

    const totalPrice = cartCourses.reduce((sum, c) => sum + c.originalPrice, 0);

    return (
        <>
            <Helmet>
                <title>Checkout | LevelUp LMS</title>
                <meta name="description" content="Complete your course enrollment and payment securely on LevelUp LMS." />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-2 mb-6">
                    <h1 className="text-4xl font-semibold text-primary-400">Shopping Cart</h1>
                    <p className="text-gray-600">{cartCourses.length} courses in cart</p>
                </div>
                <hr />
                {cartCourses.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="lg:col-span-2">
                            {cartCourses.map(course => (
                                <CartCourseItem key={course.id} course={course} onRemove={handleRemove} />
                            ))}
                        </div>
                        <CartSummary total={totalPrice} onCheckout={handleCheckout} />
                    </div>
                )}
            </div>
        </>
    );
}
