import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import TestimonialsSection from "./TestimonialsSection";
import { assets } from "../../assets/assets";

function CoursesSection() {
  const { allCourses, allTestimonials } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className='text-3x1 font-medium text-gray-800"'>
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, <br /> our courses are crafted to
        deliver results.
      </p>
      <div className="grid grid-cols-4 px-4 md:px-0 md:my-10 my-6 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className=" text-gray-600 border border-gray-500/30 px-8 py-3 rounded "
      >
        Show all courses
      </Link>
      <h2 className="text-3xl m-3">Testimonials</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br />
        platform has made a difference in their lives.
      </p>
      <div className="grid grid-cols-4 px-4 md:px-0 md:my-10 my-6 gap-4">
        {allTestimonials.slice(0, 3).map((educator, index) => (
          <TestimonialsSection key={index} educator={educator} />
        ))}
      </div>
      <h1 className="text-5xl">Learn anything, anytime, anywhere</h1>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className="flex w-full items-center justify-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 bg-blue-500 text-white rounded-md">
          Get started
        </button>
        <button className="flex items-center gap-2">
          Learn more <img src={assets.arrow_icon} alt="arrow icon" />
        </button>
      </div>
      
    </div>
  );
}

export default CoursesSection;
