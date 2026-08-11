import React, { useState, useEffect, useContext } from "react";
import noteContext from "./NoteContext";
import AuthContext from "../auth/authContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleUnauthorized = () => {
    setNotes([]);
    logout();
  };

  const fetchAllNotes = async () => {
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
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (response.ok) {
        setNotes(data);
      } else {
        console.log(data.message);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const searchNotes = async (q) => {
    const query = (q || "").toString();
    try {
      const url = `http://localhost:5000/api/notes/searchnotes?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.status === 401) 
      {
        handleUnauthorized();
        return;
      }
      if (response.ok) {
        setNotes(data);
      }
      else {
        console.log(data.message);
        setNotes([]);
      }
    } 
    catch (error) {
      console.error("Error searching notes:", error);
      setNotes([]);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/addnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        handleUnauthorized();
        return false;
      }
      if (response.ok && data.note) {
        setNotes((prev) => prev.concat(data.note));
        return true;
      }
      console.log(data.message || data.errors);
      return false;
    } catch (error) {
      console.error("Error adding note:", error);
      return false;
    }
  };

  useEffect(() => 
  {
    if (isLoggedIn) {
      fetchAllNotes();
    } 
    else {
      setNotes([]);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <noteContext.Provider
      value={{ notes, setNotes, fetchAllNotes, searchNotes, addNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
