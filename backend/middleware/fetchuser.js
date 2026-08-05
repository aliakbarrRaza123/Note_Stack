const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // Get token from request header {method,header(content-type,auth-token),body}
  const token = req.header("auth-token");
  if(!token)
  {
    return (res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    }));
  }
  try 
  {
    // it verifies that the token is not tamper and returns the payload(json).
    const data = jwt.verify(token, JWT_SECRET);
    // Attach user payload to request
    req.user = data.user;
    // go to route handler my work is done.
    next();  
  } 
  catch (error) {
    return (res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    }));
  }
};

module.exports = fetchuser;