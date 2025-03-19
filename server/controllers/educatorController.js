import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";

//Upadate role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res.json({
      success: true,
      message: "You can publish your course now",
    }); // ✅ Fix: Added return
  } catch (error) {
    console.error("Error in updateRoleToEducator:", error);
    return res.status(500).json({ success: false, message: error.message }); // ✅ Fix: Properly returning response
  }
};
// Add course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Please upload a thumbnail" }); // ✅ Fix: Added return
    }

    const parseCourseData = JSON.parse(courseData);
    parseCourseData.educator = educatorId;
    const newCourse = await Course.create(parseCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    return res.json({
      success: true,
      message: "Your course has been uploaded",
    }); // ✅ Fix: Added return
  } catch (error) {
    console.error("Error in addCourse:", error);
    return res.status(500).json({ success: false, message: error.message }); // ✅ Fix: Properly returning response
  }
};

//Get Educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get educator Dashboard data(Tot. earning ,enrolled student , no. of courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourse = courses.length;

    const courseId = courses.map((course) => course._id);
    //calculate tot. earning
    const purchases = await Purchase.find({
      courseId: { $in: courseId },
      status: "completed",
    });
    const totalEarning = purchases.reduce((acc, item) => acc + item.amount, 0);
    //calculate enrolled student with unique userI and course title
    const enrolledStudentData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );
      students.forEach((student) => {
        enrolledStudentData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }
    res.json({
      success: true,
      dashboardData: { totalCourse, totalEarning, enrolledStudentData },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get enrolled student data with purchase data
export const getEnrolledStudentData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });

    const courseId = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseId },
      status: "complete",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");
    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
