import React, { useState, useEffect, useContext } from "react";
import noteContext from "./noteContext";
import AuthContext from "../auth/authContext";
import API_BASE_URL from "../../utils/api";

// note state - used to update the state of note.
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleUnauthorized = () => {
    setNotes([]);
    logout();
  };

  const fetchAllNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/fetchallnotes`,
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
      } 
      else {
        console.log(data.message);
        setNotes([]);
      }
    }
    catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const searchNotes = async (q) => {
    const query = (q || "").toString();
    try {
      const url = `${API_BASE_URL}/api/notes/searchnotes?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.status === 401) {
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
      const response = await fetch(`${API_BASE_URL}/api/notes/addnote`,
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
    } 
    catch (error) {
      console.error("Error adding note:", error);
      return false;
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
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
        // Local state mein update krdo — page reload ki zarurat nahi.
        // sab notes ke sath compare krega and updates the correct one.
        setNotes((prev) =>
          prev.map((prevNote) => (prevNote._id === id ? data.note : prevNote))
        );
        return true;
      }
      console.log(data.message || data.errors);
      return false;
    } 
    catch (error) {
      console.error("Error updating note:", error);
      return false;
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        handleUnauthorized();
        return false;
      }
      if (response.ok) {
        // condition satisfy krne wale notes rakhte hain baqi filter out.
        setNotes((prev) => prev.filter((n) => n._id !== id));
        return true;
      }
      console.log(data.message || data.errors);
      return false;
    } 
    catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  };

  useEffect(() => {
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
      value={{
        notes,
        setNotes,
        fetchAllNotes,
        searchNotes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
