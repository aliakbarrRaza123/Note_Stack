// import express
const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

// router.get(url,callback function)
// ROUTE 1 : get all the notes using -> GET "/api/notes/fetchallnotes".
// Login required.
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
  const notes = await Notes.find({user : req.user.id});
  res.json(notes);
})

// ROUTE 2 : Create a note using -> POST "/api/notes/addnote".
// Login required.
router.post("/addnote", fetchuser,
  [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const {title,description,tag} = req.body;
    try 
    {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,  // unique
      });
      const savedNote = await note.save();
      res.json({
        success: true,
        note: savedNote,
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

module.exports = router;