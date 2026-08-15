import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addNote(note.title, note.description, note.tag);
    if (ok) {
      setNote({ title: "", description: "", tag: "General" });
    } else {
      alert("Could not add note. Please try again.");
    }
  };

  return (
    <div className="ns-add-note">
      <h2 className="fw-bold mb-3">Add a Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn ns-btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
}
