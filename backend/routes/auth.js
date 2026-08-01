// imports
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// kis url par request ayegi or kia response dena hai router.post(url,callback_function)
// create a user and save to Mongodb
router.post("/createuser", async (req, res) => {
  try 
  {
    // creates a document in Mongodb Compass in users collection
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

module.exports = router;
