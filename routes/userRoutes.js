const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);

userRoutes.route("/login").post(loginUser);

userRoutes.route("/current").get(validateToken, currentUser);

module.exports = userRoutes;
