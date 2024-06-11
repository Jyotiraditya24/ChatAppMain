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
    // await newMessage.save();

    // Add the message ID to the conversation and save the conversation
    conversation.messages.push(newMessage._id);
    // await conversation.save();

    // we can also do very fast
    await Promise.all([newMessage.save(), conversation.save()]);

    resp.status(201).json({
      message: "Message sent successfully",
      payloadBACKEND: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, resp) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  try {
    //   FIND THE CONVERSATION BETWEEN THESE TWO USERS
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("messages");
    // The populate methods fills the objectID with the object itself
    if (!conversation) {
      return resp.status(404).json({ error: "Conversation not found" });
    }
    resp.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getMessage Controller :", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
};
