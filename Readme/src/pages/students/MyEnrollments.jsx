import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/students/Footer";

function MyEnrollments() {
  const { enrollments, calculateCourseDuration, navigate } =
    useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 3, totLecture: 6 },
    { lectureCompleted: 6, totLecture: 9 },
    { lectureCompleted: 4, totLecture: 7 },
    { lectureCompleted: 5, totLecture: 5 },
    { lectureCompleted: 3, totLecture: 8 },
    { lectureCompleted: 2, totLecture: 7 },
    { lectureCompleted: 5, totLecture: 6 },
    { lectureCompleted: 3, totLecture: 5 },
    { lectureCompleted: 5, totLecture: 9 },
    { lectureCompleted: 7, totLecture: 9 },
    { lectureCompleted: 3, totLecture: 6 },
    { lectureCompleted: 3, totLecture: 7 },
    { lectureCompleted: 6, totLecture: 7 },
    { lectureCompleted: 2, totLecture: 5 },
  ]);

  return (
    <div className="container"> 
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold mb-6">My Enrollments</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((course, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    className="w-14 sm:w-24 md:w-28 rounded"
                    alt=""
                  />
                  <p className="font-medium">{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] &&
                   (100*progressArray[index].lectureCompleted)/progressArray[index].totLecture} className="bg-gray-300 rounded-full" />
                </td>
                <td className="px-4 py-3">{calculateCourseDuration(course)}</td>
                <td className="px-4 py-3">
                  {progressArray[index] &&
                    progressArray[index].lectureCompleted +
                      "/" +
                      progressArray[index].totLecture}
                  <span>Lessons</span>
                </td>
                <td>
                  <button onClick={()=>navigate('/player/'+course._id)}
                    className={`text-white font-bold py-2 px-4 rounded 
    ${progressArray[index] &&
      progressArray[index].lectureCompleted < progressArray[index].totLecture
        ? "bg-yellow-500 hover:bg-yellow-600" 
        : "bg-green-600 hover:bg-green-700" 
    }`}
                  >
                    {progressArray[index].lectureCompleted <
                    progressArray[index].totLecture
                      ? "In Progress"
                      : "Completed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyEnrollments;
