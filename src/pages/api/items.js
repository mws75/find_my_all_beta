import dbConnect from "../../lib/mongodb";
import { UserModel } from "../../models/user-model";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  // GET /api/your-endpoint?clerkId=user_abc123
  switch (method) {
    case "GET":
      console.log("get list of items");
      try {
        const { clerkId } = req.query;
        if (!clerkId) {
          return res
            .status(400)
            .json({ success: false, message: "missing clerkId" });
        }

        const user = await UserModel.findOne({ clerkId });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }
        console.log("items retrieved successfully");
        res.status(200).json({ success: true, data: user.items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { clerkId, item } = req.body;
        if (!clerkId || !item) {
          return res.status(400).json({
            success: false,
            message: "missing clerkId or item information",
          });
        }

        const user = await UserModel.findOne({ clerkId });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        // Add item to user's item array
        user.items.push(item);
        await user.save();

        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ succes: false });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "method not allowed" });
  }
}
