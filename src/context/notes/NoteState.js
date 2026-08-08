import React, { useState, useEffect } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  // Fetch all notes of logged-in user
  const fetchAllNotes = async () => 
  {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if(response.ok) {
        setNotes(data);
      }
      // print error message
      else {
        console.log(data.message);
      }
    } 
    catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    // Fetch notes only if token exists
    if (localStorage.getItem("token")) {
      fetchAllNotes();
    }
  }, []);

  return (
    <noteContext.Provider value={{notes,setNotes,fetchAllNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;