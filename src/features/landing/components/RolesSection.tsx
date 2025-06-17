import students from "../../../assets/students.png";
import instructor from "../../../assets/instructor.png";
import organization from "../../../assets/organization.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { Pagination } from "swiper/modules";

function RolesSection() {
  const roles = [
    {
      img: students,
      title: "Students",
      description:
        "Organize your study plan, join interactive lessons, and track your progress.",
    },
    {
      img: instructor,
      title: "Instructors",
      description:
        "Deliver high-quality courses with modern tools and real-time analytics.",
    },
    {
      img: organization,
      title: "Organizations",
      description:
        "Manage your teams, create training programs, and monitor performance.",
    },
  ];

  return (
    <section className="py-16 bg-primary-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary-400">
          Who Is LevelUp For?
        </h2>

        {/* Slider for small screens */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            pagination={false}
            modules={[Pagination]}
          >
            {roles.map((role, idx) => (
              <SwiperSlide key={idx}>
                <div className=" p-6 mx-auto w-[90%]">
                  <img
                    src={role.img}
                    alt={`${role.title} icon`}
                    className="mx-auto object-contain mb-4 "
                    loading="lazy"
                  />
                  <h5 className="text-2xl font-semibold text-dark-400 mb-2">
                    {role.title}
                  </h5>
                  <p className="text-dark-400 text-base">{role.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid layout for medium+ screens */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="p-6 flex flex-col items-center space-y-3 "
            >
              <img
                src={role.img}
                alt={`${role.title} icon`}
                className="object-contain"
                loading="lazy"
              />
              <h5 className="text-2xl font-semibold text-dark-400">
                {role.title}
              </h5>
              <p className="text-dark-400 text-base">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RolesSection;
