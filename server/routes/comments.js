const express = require("express");
const {
  commentPost,
  fetchComment,
  deleteComment,
} = require("../controller/comment");
const auth = require("../middleware/auth");

const route = express.Router();

route.get("/:postId", fetchComment);
route.post("/", auth, commentPost);
route.delete("/:commentId", auth, deleteComment);

module.exports = route;
