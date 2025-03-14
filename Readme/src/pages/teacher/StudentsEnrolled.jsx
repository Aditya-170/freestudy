import React, { useEffect } from "react";
import Loading from "../../components/students/Loading";
import { dummyStudentEnrolled } from "../../assets/assets";

function StudentsEnrolled() {
  const [studentEnrolled, setStudentEnrolled] = React.useState(null);

  const fetchStudentData = async () => {
    setStudentEnrolled(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return studentEnrolled ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8">
      <div className="w-full">
        <h2 className="pb-6 text-xl font-semibold">Enrolled Students</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg bg-white">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 font-medium text-left">Name</th>
                <th className="px-6 py-3 font-medium text-left">Course Title</th>
                <th className="px-6 py-3 font-medium text-left">Enrolled Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm text-gray-600">
              {studentEnrolled.map((student) => (
                <tr key={student.student._id} className="border-b border-gray-300 hover:bg-gray-50 transition">
                  {/* Student Image & Name */}
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={student.student.imageUrl}
                      alt={student.student.name}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                    <span className="font-medium">{student.student.name}</span>
                  </td>

                  {/* Course Title */}
                  <td className="px-6 py-4">{student.courseTitle}</td>

                  {/* Enrollment Date */}
                  <td className="px-6 py-4">{new Date(student.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default StudentsEnrolled;
