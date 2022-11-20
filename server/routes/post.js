const express = require("express");
const {
  fetchPost,
  sendPost,
  singlePost,
  deletePost,
  categoryPost,
  userProfile,
  updatePost,
} = require("../controller/post");
const auth = require("../middleware/auth");

const route = express.Router();

route.get("/", auth, fetchPost);
route.post("/", auth, sendPost);
route.get("/byId/:id", auth, singlePost);
route.delete("/:postId", auth, deletePost);
route.get("/:categoryId", auth, categoryPost);
route.patch("/:id", auth, updatePost);

route.get("/profile/:id", userProfile);

module.exports = route;
