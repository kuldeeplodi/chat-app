import Message from "../models/message.model.js";
import User from "../Models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInuserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInuserId } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("error in get all users", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderID: myId, reveiverId: userTochatId },
        { senderID: userTochatId, reveiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in get all messages", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage=new Message({senderId,receiverId,text,image:imageUrl});

    await newMessage.save();

   // todo: emit socket event to receiver
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("error in sending message", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

