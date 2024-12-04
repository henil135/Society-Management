const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  messageContent: { type: String },
  type: {
    type: String,
    enum: ["text", "image", "file", "video"],
    default: "text",
  },
  fileUrl: { type: String },
  fileName: { type: String },
  fileSize: { type: String },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner"},
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["read", "unread"], default: "unread" },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
