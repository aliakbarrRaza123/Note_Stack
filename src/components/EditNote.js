import React, { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function EditNote({ note, show, onClose }) 
{
  const { editNote } = useContext(noteContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "General",
  });
  // Jab naya note edit ke liye aaye, form uski values se bhar do
  useEffect(() => {
    if (note) {
      setForm({
        title: note.title || "",
        description: note.description || "",
        tag: note.tag || "General",
      });
    }
  }, [note]);

  // body scroll lock by adding 'modal-open' class in the body.
  useEffect(() => 
  {
    if (show) {
      document.body.classList.add("modal-open");
    }
    else {
      document.body.classList.remove("modal-open");
    }
    // cleanup function
    return () => document.body.classList.remove("modal-open");
  }, [show]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note?._id) 
      return;
    const ok = await editNote(
      note._id,
      form.title,
      form.description,
      form.tag
    );
    if(ok) {
      onClose();
    }
    else {
      alert("Could not update note. Please try again.");
    }
  };

  if (!show || !note) 
    return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editNoteTitle"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ns-auth-card border-0">
            <div className="modal-header border-0 pb-0">
              <h2 className="modal-title fs-4 fw-bold" id="editNoteTitle">
                Edit Note
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edit-title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-title"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edit-description"
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-0">
                  <label htmlFor="edit-tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-tag"
                    name="tag"
                    value={form.tag}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn ns-btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn ns-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
