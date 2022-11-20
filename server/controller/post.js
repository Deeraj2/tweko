const { Posts, Likes, Save } = require("../models");

const fetchPost = async (req, res) => {
  const getPost = await Posts.findAll();
  res.json(getPost);
};

const sendPost = async (req, res) => {
  const post = req.body;
  post.UserId = req.userId;
  await Posts.create(post);
  res.status(200).json(post);
};

const singlePost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({
    where: { id: id },
    include: [Likes, Save],
  });
  const likePost = await Likes.findAll({ where: { UserId: req.userId } });
  const savePost = await Save.findAll({ where: { UserId: req.userId } });
  res.json({ post, likePost, savePost });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Delete Successfully");
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  const singlePost = await Posts.findByPk(id);
  if (!singlePost)
    return res.status(404).json({ message: " No post with this id " });

  const updatePost = await Posts.update({ ...post }, { where: { id: id } });
  res.json(updatePost);
};

const categoryPost = async (req, res) => {
  const { categoryId } = req.params;
  const post = await Posts.findAll({ where: { category: categoryId } });
  res.json(post);
};

const userProfile = async (req, res) => {
  const id = req.params.id;
  const listOfPost = await Posts.findAll({ where: { UserId: id } });
  res.status(200).json(listOfPost);
};

module.exports = {
  fetchPost,
  sendPost,
  singlePost,
  deletePost,
  categoryPost,
  userProfile,
  updatePost,
};
