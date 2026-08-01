// import express
const express = require("express");
const router = express.Router();

// (url,callback function)
// kis url par request ayegi or kia response dena hai 
router.get('/',(req,res)=>{
  res.json([]);
})

module.exports = router;