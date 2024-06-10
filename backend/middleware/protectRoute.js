import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, resp, next) => {
  try {
    // CHECK FOR TOKEN IN HEADERS
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return resp
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    // EXTRACT TOKEN
    const token = authHeader.split(" ")[1];

    // CHECK IF TOKEN IS RIGHT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return resp
        .status(401)
        .json({ error: "Unauthorized - Invalid Token Provided" });
    }

    console.log("Value of decoded is: ", decoded);

    // FIND USER BY ID AND REMOVE PASSWORD FROM RESULT
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    // ATTACH USER TO REQUEST OBJECT
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect Route middleware: ", error.message);
    return resp.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
