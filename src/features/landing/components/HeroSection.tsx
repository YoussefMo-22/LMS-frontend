import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";
import landingHero from "../../../assets/landingHero.png";

function HeroSection() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-16 grad">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-primary-400">
                        Unlock Your Learning Potential with LevelUp
                    </h1>
                    <p className="text-xl mb-4 text-primary-400">
                        A powerful LMS designed for students, instructors, and organizations.
                        Learn smarter, teach better, grow faster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <ButtonUI onClick={handleNavigate} className="text-white">
                            Explore
                        </ButtonUI>
                        <ButtonUI
                            onClick={handleNavigate}
                            className="bg-transparent border-2 border-primary-400 text-primary-400 hover:bg-primary-200"
                        >
                            Get Started Free
                        </ButtonUI>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center">
                    <img src={landingHero} alt="Landing Hero" />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
