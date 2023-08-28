// external import
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal import
const usermodel = require("../models/userModel");

//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // all field given or not
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // existed email check
  const emailexisted = await usermodel.findOne({ email });

  if (emailexisted) {
    res.status(400);
    throw new Error("User already registered");
  }

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // replacing the orginal password with hash password
  req.body.password = hashedPassword;

  // create a new document in database
  const registereduser = await usermodel.create(req.body);

  res.json(registereduser);
});

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // find the user exist or not
  const user = await usermodel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // compare password of the user
  if (await bcrypt.compare(password, user.password)) {
    // generate the property that given to user
    const userObject = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    //generate access token
    const accessToken = jwt.sign(
      userObject,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Password not valid");
  }
});

//@desc current user information
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
