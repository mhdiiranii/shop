const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const twilio = require("twilio")

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const validateEmail = (email) => validator.isEmail(email);
const validateUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

// const createSendToken = (token, req, res) => {
//   res.cookie('jwt', token, {
//     expires: new Date(
//       Date.now() + '10' * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
//   });
// };

exports.signUp = async (req, res, next) => {
  const { username, email, password, phoneNumber } = req.body;

  if (!validateEmail(email) || !validateUsername(username) || !validatePassword(password)) {
    return res.status(400).json({
      status: 400,
      message: "مشگلی در ایمیل یا رمز یا نام کاربری وجود دارد!",
    });
  }
  try {
    let myUser = await User.findOne({ username, phoneNumber });
    if (myUser) {
      return res.status(401).json({ status: 401, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    const secret = "944c9ba7ba18ab99a2aed466dfe785250ae3e405";

    const token = jwt.sign({ username, email }, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: 201,
      token,
      data: newUser,
    });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.logeIn = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    let myUser = await User.findOne({ username });
    if (!User) {
      res.status(404).json({ message: "کاربر پیدا نشد" });
    }
    const checkPass = bcrypt.compare(password, myUser.password);
    if (!checkPass) {
      res.status(401).json({ message: "رمز اشتباه است" });
    }
    const secret = "944c9ba7ba18ab99a2aed466dfe785250ae3e405";
    const token = jwt.sign({ username, email }, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      data: myUser,
      token,
      message: "ورود با موفقیت",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
};
exports.userList = async (req, res, next) => {
  const allUser = await User.find({}, { password: 0 });
  res.status(200).json({
    status: "success",
    data: {
      allUser,
    },
  });
};
