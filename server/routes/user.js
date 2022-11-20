const express = require("express");
const { signIn, signUp, userInfo } = require("../controller/user");

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);

route.get("/userInfo/:id", userInfo);

module.exports = route;
