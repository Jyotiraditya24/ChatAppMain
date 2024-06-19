import User from "../models/userModel.js";

export const getUsers = async (req, resp) => {
  try {
    // const userId = req.user._id;
    const allUsers = await User.find().select("-password");
    // if you donot want the current logged in user use .find({_id: {$ne:userId}})
    if (!allUsers) {
      return resp.status(404).json({ message: "No users found" });
    }

    resp.status(200).json(allUsers);
  } catch (error) {
    resp
      .status(500)
      .json({ error: "Error in message controller: " + error.message });
  }
};