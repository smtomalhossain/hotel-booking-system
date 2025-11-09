import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // raw body required
    const payload = req.body.toString();

    const evt = whook.verify(payload, headers);
    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
      recentSearchedCities: "", // default
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Webhook Error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
