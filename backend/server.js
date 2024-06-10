import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectToDB from "./db/connection.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json()); // to parse incoming requests with json payload

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});
