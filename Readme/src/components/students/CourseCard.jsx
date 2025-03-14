import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from 'react-router-dom';



function CourseCard({ course }) {
  
  const {currency,calculateRating}=useContext(AppContext)
  return (
    <Link to={'/course/'+course._id} onClick={()=>scrollTo(0,0)} className="border border-gray-500/30 p-3 rounded-lg overflow-hidden">
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">Stalber</p>
      
      <div className="flex item-center space-x-2">
        <p>{calculateRating(course)}</p>
      
        <div className="flex">
          {Array(5)
            .fill()
            .map((_, index) => (<img src={index<Math.ceil(calculateRating(course))?assets.star:assets.star_blank} alt="star" key={index} className="w-3.5 h-3.5" />
            ))}
        </div>
        <p className="text-gray-500">{course.courseRatings.length}</p>
      </div>
    
      <p className="text-gray-800 text-base font-semibold">{currency}
        {(
          course.coursePrice -
          (course.coursePrice * course.discount) / 100
        ).toFixed(2)}
      </p>
      </div>
    </Link>
  );
}

export default CourseCard;
