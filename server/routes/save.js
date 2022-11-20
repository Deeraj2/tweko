const express = require("express");
const { Save } = require("../models");
const auth = require("../middleware/auth");

const route = express.Router();

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listOfSaved = await Save.findAll({ where: { UserId: id } });
  res.status(200).json(listOfSaved);
});

route.post("/", auth, async (req, res) => {
  const { UserId, PostId } = req.body;
  const found = await Save.findOne({ where: { PostId, UserId } });
  if (!found) {
    await Save.create({ PostId, UserId });
    res.status(200).json({ saved: true });
  } else {
    await Save.destroy({ where: { PostId, UserId } });
    res.status(200).json({ saved: false });
  }
});

module.exports = route;
