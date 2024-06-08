import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, resp) => {
  const { fullName, userName, password, confirmPassword, gender } = req.body;
  if (password !== confirmPassword) {
    return resp
      .status(400)
      .json({ error: "Password and confirm Password do not match!" });
  }
  try {
    //check if the user already exists, if not create one
    const user = await User.findOne({ userName });

    if (user) {
      return resp.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Profile pic
    const profilePic = `https://avatar.iran.liara.run/public/${
      gender == "female" ? "girl" : "boy"
    }?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic,
    });

    if (newUser) {
      // Generate JWT token
      generateTokenAndSetCookie(newUser._id, resp);
      await newUser.save();
      resp.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      resp.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in sign Up controller" + error.message);
    return resp.status(500).json("Internal server error");
  }
};

export const login = (req, resp) => {
  const { userName, password } = req.body;
};
export const logout = (req, resp) => {
  resp.status(200).json({ status: "ok" });
};
