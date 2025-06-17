import ButtonUI from "../../../shared/components/UI/Button";
import ready from "../../../assets/readyImg.png";

function ReadySection() {
  return (
    <section className="bg-primary-100 py-16">
      <div className="container mx-auto ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text Section */}
          <div className="text-center lg:text-left flex-1">
            <h4 className="text-4xl font-bold text-primary-400 mb-4">
              Ready to Level Up?
            </h4>
            <p className="font-semibold text-4xl mb-2">
              Join thousands of learners and educators who trust LevelUp.
            </p>
            <p className="text-dark-400 text-lg mb-6">
              Start your journey today — it's free to sign up!
            </p>
            <ButtonUI className="px-6 py-3 text-lg text-white">Get Started Now</ButtonUI>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img
              src={ready}
              alt="Ready to Level Up"
              className="w-full max-w-md mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReadySection;
