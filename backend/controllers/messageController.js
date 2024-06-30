import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceieverSocketId, io } from "../socket/socket.js";

// In sendMessage controller:
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [], // Initialize the messages array
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    // Add the new message to the conversation's messages array
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // save and then send the message
    // getting socket ID from reciever id
    const receiverSocketId = getReceieverSocketId(receiverId);
    if (receiverId) {
      // Only sending to the reciever id
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      payloadBACKEND: newMessage.toObject(),
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// In getMessage controller:
export const getMessage = async (req, res) => {
  // Changed 'resp' to 'res' for consistency
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate({
      path: "messages",
      select: "_id senderId receiverId message createdAt updatedAt",
      populate: {
        path: "senderId receiverId",
        select: "_id",
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = conversation.messages.map((message) => ({
      _id: message._id,
      senderId: message.senderId._id,
      receiverId: message.receiverId._id,
      message: message.message,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getMessage Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
