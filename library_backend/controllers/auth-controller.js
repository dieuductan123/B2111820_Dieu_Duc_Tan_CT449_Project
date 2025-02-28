const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// register controller
const registerUser = async (req, res) => {
  try {
    // extract user info from request body
    const {username, email, password, role} = req.body;

    // check if the user is already exist in database
    const checkExistingUSer = await User.findOne({$or : [{username}, {email}]})
    if (checkExistingUSer) {
      return res.status(400).json({
        success: false,
        message: 'User already exist either with same username or same email. Please try with a difference username or email',
      })
    }

    // hash user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    // create a new user and save in database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    })

    await newlyCreatedUser.save();

    if(newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: 'User register successfully!'
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user please try again.",
      });
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

// login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find if the current user is exist in db or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User doesn't exist!`,
      });
    }

    //if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
    // create user token
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn : '30m'
    })

    res.status(200).json({
      success : true,
      message : 'Logged in successfully!',
      accessToken
    })


  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
