const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstname lastname",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    // Map messages to include timestamp
    const chatWithTimestamps = {
      ...chat.toObject(),
      messages: chat.messages.map(msg => ({
        ...msg.toObject(),
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt
      }))
    };
    res.json(chatWithTimestamps);
  } catch (err) {
    console.error(err);
  }
});

module.exports = chatRouter;