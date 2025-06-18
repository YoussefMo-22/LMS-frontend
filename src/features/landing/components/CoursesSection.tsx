import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import CourseCard from "../../../shared/components/CourseCard";
import EnrollCourseCard from "../../../shared/components/EnrollCourseCard";

function CoursesSection() {
  return (
    <section className="py-16 bg-primary-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-primary-400 mb-10 text-center">
          Explore Our Top Courses!
        </h2>

        {/* Swiper for small screens */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}

            modules={[Pagination]}
          >
            {[1, 2, 3].map((_, idx) => (
              <SwiperSlide key={idx}>
                <CourseCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid layout for md+ */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>



        {/* Swiper for enrolled courses on small screens */}
        <div className="md:hidden mt-6">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}

            modules={[Pagination]}
          >
            {[1, 2, 3].map((_, idx) => (
              <SwiperSlide key={idx}>
                <EnrollCourseCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid layout for enrolled courses md+ */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EnrollCourseCard />
          <EnrollCourseCard />
          <EnrollCourseCard />
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
