const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notes = require("../models/Notes");

const JWT_SECRET = process.env.JWT_SECRET;

// fetchuser identifies the logged-in user for protected routes.
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) 
  {
    return (res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    }));
  }
  try 
  {
    // verify method returns payload.
    const data = jwt.verify(token, JWT_SECRET);
    // User must still exist in DB (handles manual delete / account removal).
    const user = await User.findById(data.user.id).select("_id");
    if(!user) 
    {
      // Clean orphan notes left behind if user was deleted from DB directly.
      await Notes.deleteMany({ user: data.user.id });
      return (res.status(401).json({
        success: false,
        message: "User no longer exists. Please log in again.",
      }));
    }
    req.user = data.user;
    // go to route handler my work is done.
    next();
  } 
  catch(error) {
    return (res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    }));
  }
};

module.exports = fetchuser;
