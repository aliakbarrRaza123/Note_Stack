// imports using commonJS
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// jwt secret key is used to verify that user is same as at the time of signup. 
const JWT_SECRET = process.env.JWT_SECRET;

// konse url par request ayegi or kia response dena hai router.post(url,callback_function).
// create a user and save to Mongodb.
router.post("/createuser",
  [
    // data validation check. 
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => 
  {
    // throw error if validation violates.
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return (res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      }));
    }
  try 
  {
    // prevent duplicate email insertion.
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) 
    {
      return (res.status(400).json({
        success: false,
        message: "Email already exists",
      }));
    }    
    // bcrypt returns promise (pending,accepted,rejected)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // creates a user in database.
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    // Payload (jo token ke andar jayega)
    const data = {
      user: {
        id: user.id
      }
    };
    // Generate JWT Token (every user has a unique token)
    // jwt token contains (Header,Payload,Signature)
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({
      success: true,
      authToken
    });
  }
  // duplicate email or some system error catch.
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    // console.log(error);
  }
});

module.exports = router;
