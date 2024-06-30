import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToDB from "./db/connection.js";
import { app, server } from "./socket/socket.js";

dotenv.config();


const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true, // Allow credentials
  })
);
app.use(cookieParser());
app.use(express.json()); // to parse incoming requests with json payload

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});

console.log(process.env.PORT);
