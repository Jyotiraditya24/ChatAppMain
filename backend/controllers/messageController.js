import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, resp) => {
  try {
    const { message } = req.body;
    // through the params
    const { id: receiverId } = req.params;
    // comes through the middleware
    const senderID = req.user._id;

    // Find the conversation between these users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderID, receiverId] },
    });

    // If no conversation, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderID, receiverId],
      });
    }

    // Create the message
    const newMessage = new Message({
      senderId: senderID,
      receiverId: receiverId,
      message: message,
    });

    // Save the new message to the database
    await newMessage.save();

    // Add the message ID to the conversation and save the conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    resp.status(201).json({
      message: "Message sent successfully",
      payloadBACKEND: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};
