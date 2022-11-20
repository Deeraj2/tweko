const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

const signUp = async (req, res) => {
  const { name, email, avatar, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please enter the field" });
    }

    const existUser = await Users.findOne({ where: { email: email } });
    if (existUser) return res.json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      name,
      email,
      avatar,
      password: hashedPassword,
    });

    res.status(201).json({ result, token: generateToken(result.id) });
  } catch (error) {
    res.status(401).json(error);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Users.findOne({ where: { email: email } });
    if (!existing) res.json({ error: "User doesn't exist" });

    const isPassword = await bcrypt.compare(password, existing.password);
    if (!isPassword) res.json({ error: "Password doesn't match" });

    if (existing && isPassword)
      return res.status(200).json({
        result: existing,
        token: generateToken(existing.id),
      });
  } catch (error) {
    res.status(401).json({ message: "Invalid email and token" });
  }
};

const userInfo = async (req, res) => {
  const { id } = req.params;
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.status(200).json(basicInfo);
};

module.exports = { signIn, signUp, userInfo };
