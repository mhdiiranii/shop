const {User,Product} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let myUser = await User.findOne({ username });
    if (myUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    const secret = "944c9ba7ba18ab99a2aed466dfe785250ae3e405";

    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.logeIn = async (req, res, next) => {
  
  const { username, password } = req.body;
  
  try {
    let myUser = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "کاربر پیدا نشد" });
    }
    const checkPass = bcrypt.compare(password,myUser.password)
    if(!checkPass){
      res.status(401).json({message:"رمز اشتباه است"})
    }
    const secret = "944c9ba7ba18ab99a2aed466dfe785250ae3e405";
    const token = jwt.sign({username},secret,{expiresIn:'1h'})

    res.status(201).json({
      status : "success",
      token,
      message:"ورود با موفقیت"
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
    next()
  }
};

exports.userList = async (req, res, next) => {
  const allUser = await User.find({},{password:0})
  res.status(200).json({
    status : 'success',
    data :{
      allUser
    }
  })
}

exports.productList = async (req,res,next) => {
  const allItem = await Product.find({})
  res.status(200).json({
    status:'success',
    data : {
      allItem
    }
  })
}
