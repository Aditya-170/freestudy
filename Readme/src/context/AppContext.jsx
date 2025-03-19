import { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses, dummyTestimonial } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from '@clerk/clerk-react';

export const AppContext = createContext();

export function AppContextProvider(props) {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrollments, setEnrollments] = useState([]);

  const {getToken} = useAuth();
  const {user} = useUser();
  
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let tot_ratigs = 0;
    course.courseRatings.forEach((rating) => {
      tot_ratigs += rating.rating;
    });
    return (tot_ratigs / course.courseRatings.length).toFixed(1);
  };

  const calculateChapterTime =(chapter)=>{
    let tot_time = 0;
    chapter.chapterContent.map((lecture)=>tot_time+=lecture.lectureDuration)
    return humanizeDuration(tot_time*1000*60,{units:['h','m']});
  }

  const calculateCourseDuration =(course)=>{
    let tot_time = 0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>tot_time+=lecture.lectureDuration))
    return humanizeDuration(tot_time*1000*60,{units:['h','m']})
      }

  const calculateNoOfLectures=(course)=>{
    let tot_lectures = 0;
    course.courseContent.forEach(chapter=>{
      if(Array.isArray(chapter.chapterContent)){
        tot_lectures+=chapter.chapterContent.length;
      }
    })
    return tot_lectures;
  }
  const fetchEnrollmentDetail = async()=>{
       setEnrollments(dummyCourses);
  }

  const fetchCourses = async () => {
    setAllCourses(dummyCourses)
    
  };
  const fetcheducator = async () => {
    setAllTestimonials(dummyTestimonial);
  };

  useEffect(() => {
    fetchCourses()
    fetchEnrollmentDetail()
    fetcheducator()
  }, []);

  const logToken = async()=>{
    console.log(await getToken())
  }

  useEffect(()=>{
    if(user){
        logToken();
    }
  },[user])


  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    allTestimonials,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrollments,
    fetchEnrollmentDetail
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
