const express = require("express");
const { Likes } = require("../models");
const auth = require("../middleware/auth");

const route = express.Router();

route.post("/", auth, async (req, res) => {
  const { UserId, PostId } = req.body;
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.status(200).json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.status(200).json({ liked: false });
  }
});

module.exports = route;
