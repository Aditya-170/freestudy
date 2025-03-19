import Course from "../models/Course.js";

// Get Add course
export const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    res.json({ success: true, course });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get course by ID

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const courseData = await Course.findById(id).populate({ path: "educator" });

    // Remove lectureUrl if isPreview is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });
    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
