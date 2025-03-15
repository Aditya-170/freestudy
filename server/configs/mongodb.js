import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit process on failure
    }

    mongoose.connection.on("error", (err) => {
        console.error("⚠️ MongoDB connection error:", err);
    });
};

export default connectDB;
