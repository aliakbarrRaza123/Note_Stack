// imports using commonJS
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


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

// ROUTE 4 : Request a password reset link -> POST "/api/auth/forgotpassword"
// No login required.
router.post("/forgotpassword",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, 
        message: "Validation failed", 
        errors: errors.array() 
      });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      // Security: chahe user mile ya na mile, hamesha same generic message do
      // taake koi ye pata na laga sake ke kaunsa email registered hai.
      const genericResponse = {
        success: true,
        message: "If that email is registered, a reset link has been sent.",
      };
      if (!user) {
        return res.json(genericResponse);
      }
      // Raw token generate karo (ye user ko email mein jayega)
      const rawToken = crypto.randomBytes(32).toString("hex");
      // DB mein sirf hashed version store karo (raw token kabhi DB mein na rakho)
      const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
      await user.save();

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const resetLink = `${frontendUrl}/resetpassword/${rawToken}`;
      // user ko reset link provide krdega through email.
      await sendEmail({
        to: user.email,
        subject: "Note_Stack — Password Reset",
        html: `<p>Aap ne password reset request kiya hai. Ye link 30 minutes ke liye valid hai:</p>
               <p><a href="${resetLink}">${resetLink}</a></p>
               <p>Agar aap ne ye request nahi ki, is email ko ignore kar dein.</p>`,
        // agar kisi waja se actual email send na ho to ye alternate bhejdena.
        devFallbackText: resetLink,
      });
      return res.json(genericResponse);
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// ROUTE 5 : Reset password using token -> POST "/api/auth/resetpassword/:token"
// No login required.
router.post("/resetpassword/:token",
  [body("password", "Password must be at least 5 characters").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, 
        message: "Validation failed", 
        errors: errors.array() });
    }
    try {
      // Incoming raw token ko hash karo aur DB ke hashed token se compare karo
      const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
      
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }, // expire nahi hona chahiye
      });
      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: "Reset link is invalid or has expired" 
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.json({ 
        success: true, 
        message: "Password updated successfully. Please log in."
      });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false, 
        message: "Internal Server Error" 
      });
    }
  }
);

module.exports = router;
