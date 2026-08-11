// imports using commonJS
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


// jwt secret key is used to verify that user is same as at the time of signup. 
const JWT_SECRET = process.env.JWT_SECRET;

// konse url par request ayegi or kia response dena hai router.post(url,callbackFunction).
// ROUTE 1 : Create a User using -> POST "/api/auth/createuser".
// No Login required.
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
    if(existingUser) 
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

// ROUTE 2 : Authenticate a User using -> POST "/api/auth/login".
// No Login required.
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return (res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      }));
    }
    // Destructuring 
    const {email, password} = req.body;
    try {
      // Find user by email
      const user = await User.findOne({email});
      if (!user) 
      {
        return (res.status(400).json({
          success: false,
          message: "Invalid credentials",
        }));
      }
      // Compare entered password with hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) 
      {
        return (res.status(400).json({
          success: false,
          message: "Invalid credentials",
        }));
      }
      // Payload
      const data = {
        user: {
          id: user.id,
        },
      };
      // Generate JWT
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({
        success: true,
        authToken,
      });
    } 
    catch(error) 
    {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// ROUTE 3 : Get logged-in user details using -> POST "/api/auth/getuser".
// Login required.
router.post("/getuser", fetchuser, async (req, res) => 
{
  try 
  {
    // User ID comes from middleware (user already verified to exist in fetchuser)
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please log in again.",
      });
    }
    res.json({
      success: true,
      user,
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
