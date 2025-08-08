const { default: mongoose } = require("mongoose");
const Post = require("../models/posts-m");
const User = require("../models/user-m");

const createPost = async (req, res) => {
  try {
    const { sender, receiver, subject, message } = req.body;

    const senderUser = await User.findById(sender);
    if (!senderUser) {
      return res.status(404).json({
        success: false,
        message: "Sender user not found",
      });
    }

    // Receiver: can be ObjectId, userId or name
    const findReceiver = async (input) => {
      if (mongoose.Types.ObjectId.isValid(input)) {
        return await User.findById(input);
      }
      let user = await User.findOne({ userId: input });
      if (!user) {
        user = await User.findOne({ name: input });
      }
      return user;
    };

    const receiverUser = await findReceiver(receiver);
    if (!receiverUser) {
      return res.status(404).json({
        success: false,
        message: "Receiver user not found",
      });
    }

    // Create post
    const post = await Post.create({
      sender: senderUser._id,
      receiver: receiverUser._id,
      subject,
      message,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getInbox = async (req, res) => {
  try {
    const userId = req.params.userId;
    const inbox = await Post.find({ receiver: userId }).populate("sender", "name email");
    res.status(200).json({ success: true, inbox });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getOutbox = async (req, res) => {
  try {
    const userId = req.params.userId;
    const outbox = await Post.find({ sender: userId }).populate("receiver", "name email");
    res.status(200).json({ success: true, outbox });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("sender receiver", "name email");
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteMultiplePosts = async (req, res) => {
  try {
    const { ids } = req.body;
    await Post.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Selected posts deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createPost,
  getInbox,
  getOutbox,
  getPostById,
  deletePost,
  deleteMultiplePosts,
};