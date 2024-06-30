import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in getUsers controller: " + error.message });
  }
};
