import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/students/Home';
import CourseDetails from './pages/students/CourseDetails';
import CoursesList from './pages/students/CoursesList';
import Players from './pages/students/Players';
import MyEnrollments from './pages/students/MyEnrollments';
import Loading from './components/students/Loading';
import Educator from './pages/teacher/Educator';
import Dashboard from './pages/teacher/Dashboard';
import AddCourse from './pages/teacher/AddCourse';
import MyCourses from './pages/teacher/MyCourses';
import StudentsEnrolled from './pages/teacher/StudentsEnrolled';
import Navbar from './components/students/Navbar';
import "quill/dist/quill.snow.css";

function App() {
  const location = useLocation();
  const isEducator = location.pathname.startsWith('/educator');  // Dynamically detect educator pages

  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducator && <Navbar />}  {/* Only show student navbar if not in educator routes */}

      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-List" element={<CoursesList />} />
        <Route path="/course-List/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/player/:courseId" element={<Players />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
