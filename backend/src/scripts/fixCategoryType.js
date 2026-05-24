/**
 * Migration script: Chuyển đổi product.category từ String sang Number
 * Chạy 1 lần: node src/scripts/fixCategoryType.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const result = await mongoose.connection.collection("products").updateMany(
  { category: { $type: "string" } },
  [{ $set: { category: { $toInt: "$category" } } }]
);

console.log(`Fixed ${result.modifiedCount} products with string category.`);
await mongoose.disconnect();