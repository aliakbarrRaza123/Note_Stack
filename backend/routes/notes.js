// import express
const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

// router.get(url,callback_Function)
// ROUTE 1 : Get all the notes using -> GET "/api/notes/fetchallnotes".
// Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => 
{
  try 
  {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});


// ROUTE 2 : Create a note using -> POST "/api/notes/addnote".
// Login required.
router.post("/addnote", fetchuser,
  [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => 
  {
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

// ROUTE 3 : Update an existing note using -> PUT "/api/notes/updatenote/:id"
// Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => 
{
  try 
  {
    const { title, description, tag } = req.body;
    // Create a new note object
    const newNote = {};
    
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    
    // Find the note to be updated.
    let note = await Notes.findById(req.params.id);
    if (!note) 
    {
      return (res.status(404).json({
        success: false,
        message: "Note not found"
      }));
    }
    // jo update request kar raha agar ussi user ka note hai to allow karo
    if (note.user.toString() !== req.user.id) 
      {
      return (res.status(401).json({
        success: false,
        message: "Not Allowed"
      }));
    }
    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({
      success: true,
      note
    });
  } 
  catch(error) 
  {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});


// ROUTE 4 : Delete an existing note using -> DELETE "/api/notes/deletenote/:id"
// Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => 
{
  try 
  {
    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) 
    {
      return (res.status(404).json({
        success: false,
        message: "Note not found"
      }));
    }
    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) 
      {
        return (res.status(401).json({
          success: false,
        message: "Not Allowed"
      }));
    }
    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);
    // returns deleted document
    res.json({
      success: true,
      message: "Note deleted successfully",
      note
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// ROUTE 1.5 : Search notes using -> GET "/api/notes/searchnotes?q=...".
// Login required.
router.get("/searchnotes", fetchuser, async (req, res) => 
{
  try 
  {
    const q = (req.query.q || "").toString().trim();    
    // If query is empty, behave like fetchallnotes.
    if (!q) {
      const notes = await Notes.find({ user: req.user.id });
      return res.json(notes);
    }
    // case-insensitive match karega by making regular expressions.
    const regex = new RegExp(q, "i");
    const notes = await Notes.find({
      user: req.user.id,
      $or: [{ title: regex }, { description: regex }, { tag: regex }],
    });
    return res.json(notes);
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;