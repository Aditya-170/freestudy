import { clerkClient, getAuth } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
    try {
        // ✅ Log headers to verify the Authorization header is present
        console.log("Headers:", req.headers);

        const auth = getAuth(req);
        console.log("Auth Details:", auth);

        // ✅ Fix: Check if userId is missing
        if (!auth.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No userId found" });
        }

        const user = await clerkClient.users.getUser(auth.userId);
 
        if ( user.publicMetadata.role !== "educator") {
            return res.status(403).json({ success: false, message: "You are not an educator" });
        }

        next();
    } catch (error) {
        console.error("Error in protectEducator:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
