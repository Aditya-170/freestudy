import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
    try {
        console.log("📩 Webhook received:", req.body); // Debugging log

        // Verify webhook signature
        const whooks = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whooks.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "", 
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageURL: data.image_url || "",
                };

                await User.create(userData);
                return res.json({ success: true, message: "User created successfully" });
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address || "", 
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageURL: data.image_url || "",
                };

                await User.findByIdAndUpdate(data.id, userData, { new: true });
                return res.json({ success: true, message: "User updated successfully" });
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true, message: "User deleted successfully" });
            }

            default:
                return res.status(400).json({ success: false, message: "Unknown webhook event" });
        }
    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
