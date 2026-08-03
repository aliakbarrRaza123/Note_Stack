// imports
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");

// kis url par request ayegi or kia response dena hai router.post(url,callback_function)
// create a user and save to Mongodb
router.post("/createuser",
  [
    // data validation check 
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => 
  {
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
    // creates a document in Mongodb Compass in users collection
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({
      success: true,
      user
    })
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    // console.log(error);
  }
});

module.exports = router;
