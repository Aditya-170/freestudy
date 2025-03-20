import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

//Get user data
export const getUserData = async (req, res) => {
  try {
    // console.log(req.auth);
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get user enrolled courses with leacture link
export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrollmentCourses");
    res.json({ success: true, enrolledCourses: userData.enrollmentCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Purchase course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth.userId;
    const { origin } = req.headers;
    console.log(req.headers);
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!courseData) {
      return res.json({ success: false, message: "Course not found" });
    }
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (
        courseData.coursePrice -
        (courseData.coursePrice * courseData.discount) / 100
      ).toFixed(2),
      status: "pending",
    };

    const newPurchase = await  Purchase.create(purchaseData);
    
    // Stripe initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(courseData.coursePrice )* 100, // Ensure correct pricing
        },
        quantity: 1,
      },
    ]

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
