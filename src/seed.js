// seed.js
import mongoose from "mongoose";
import { UserModel } from "./models/user-model.ts"; // adjust path
import dbConnect from "./lib/mongodb.js"; // adjust path

await dbConnect();

await UserModel.insertMany([
  {
    clerkId: "user_abc123",
    name: "Jon Doe",
    email: "jon@example.com",
    items: [],
  },
  {
    clerkId: "user_xyz789",
    name: "Jane Smith",
    email: "jane@example.com",
    items: [
      {
        name: "Backpack",
        location: "Closet",
        image: "https://example.com/backpack.jpg",
      },
      {
        name: "Passport",
        location: "Desk Drawer",
      },
    ],
  },
]);

console.log("✅ Seed complete");
process.exit();
