const { Comments } = require("../models");

const commentPost = async (req, res) => {
  const comment = req.body;
  const comments = await Comments.create(comment);
  res.json(comments);
};

const fetchComment = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await Comments.destroy({ where: { id: commentId } });
  res.json("Successfully deleted");
};

module.exports = { commentPost, fetchComment, deleteComment };
