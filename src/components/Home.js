import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/authContext";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

export default function Home() {
  const { notes, fetchAllNotes, searchNotes, deleteNote } = useContext(noteContext);
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // kaunsa note edit ho raha hai.
  const [editingNote, setEditingNote] = useState(null);
  // edit modal open hai ya close.
  const [showEdit, setShowEdit] = useState(false);

  const q = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (!isLoggedIn) 
      return;
    if (q.trim()) {
      searchNotes(q);
    } 
    else {
      fetchAllNotes();
    }
  }, [q, isLoggedIn, fetchAllNotes, searchNotes]);

  const openEdit = (note) => {
    setEditingNote(note);
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setEditingNote(null);
  };

  // Confirm ke baad delete — galti se delete na ho
  const handleDelete = async (note) => {
    const ok = window.confirm(
      `Delete "${note.title}"? This cannot be undone.`
    );
    if (!ok) return;
    const deleted = await deleteNote(note._id);
    if (!deleted) {
      alert("Could not delete note. Please try again.");
    }
  };

  // Logged-in users view 
  if (isLoggedIn) {
    return (
      <div className="container ns-workspace">
        <AddNote />
        <EditNote note={editingNote} show={showEdit} onClose={closeEdit} />
        <section>
          <div className="text-center mb-4">
            <h2 className="ns-section-title">Your Notes</h2>
            <p className="ns-section-sub mt-2">
              All your notes in one place — open, edit, or add a new one anytime.
            </p>
          </div>

          <div className="row g-4">
            {notes.length === 0 ? (
              <div className="col-12">
                <div className="ns-empty">
                  <h4 className="fw-bold mb-2">No notes yet</h4>
                  <p className="text-muted mb-0">
                    Use the form above to write your first note.
                  </p>
                </div>
              </div>
            ) : (
              notes.map((note) => (
                <div className="col-md-4" key={note._id}>
                  <div className="card ns-note-card border-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <h5 className="card-title fw-bold mb-0">{note.title}</h5>
                        <div className="d-flex gap-2 flex-shrink-0">
                          <button
                            type="button"
                            className="btn ns-btn-edit"
                            onClick={() => openEdit(note)}
                            aria-label={`Edit ${note.title}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn ns-btn-delete"
                            onClick={() => handleDelete(note)}
                            aria-label={`Delete ${note.title}`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="card-text text-muted">{note.description}</p>
                      <span className="badge ns-badge">{note.tag}</span>
                    </div>
                    <div className="card-footer bg-transparent border-0 pt-0">
                      <small className="text-muted">
                        {new Date(note.date).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }

  // Guest: app intro only — no AddNote, no notes, no forced login redirect
  return (
    <div>
      {/* Hero Section */}
      <section className="ns-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="ns-hero-title">
                Keep your notes clear and easy to find
              </h1>
              <p className="ns-hero-lead">
                Note_Stack helps you save ideas, reminders, and important
                info — all in one simple, private place.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to="/signup" className="btn ns-btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/about" className="btn ns-btn-secondary btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="ns-hero-panel">
                <div className="ns-hero-mark" aria-hidden="true">
                  ✎
                </div>
                <h3 className="fw-bold mt-2">Your notes. Your space.</h3>
                <p className="text-muted mb-0 mt-2">
                  Write quickly, organize with tags, and find anything later
                  with search.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ns-section ns-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="ns-section-title">What you can do</h2>
            <p className="ns-section-sub mt-2">
              Simple tools to write, update, and keep your notes safe.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    ✎
                  </div>
                  <h4 className="ns-card-title">Write notes</h4>
                  <p className="ns-card-text">
                    Type a title and a few lines. Save it in seconds.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    ✏
                  </div>
                  <h4 className="ns-card-title">Edit anytime</h4>
                  <p className="ns-card-text">
                    Change a note whenever you need — no hassle.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    ⌫
                  </div>
                  <h4 className="ns-card-title">Delete old notes</h4>
                  <p className="ns-card-text">
                    Remove notes you no longer need and keep things tidy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    ◎
                  </div>
                  <h4 className="ns-card-title">Private & safe</h4>
                  <p className="ns-card-text">
                    Only you can see your notes after you log in.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    #︎
                  </div>
                  <h4 className="ns-card-title">Use tags</h4>
                  <p className="ns-card-text">
                    Label notes like Work or Ideas so they stay organized.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ns-card h-100 border-0">
                <div className="card-body text-center">
                  <div className="ns-card-icon" aria-hidden="true">
                    ⌕
                  </div>
                  <h4 className="ns-card-title">Search fast</h4>
                  <p className="ns-card-text">
                    Find any note quickly with the search bar up top.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ns-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="ns-section-title">How it works</h2>
            <p className="ns-section-sub mt-2">
              Three easy steps to start using Note_Stack.
            </p>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="ns-step">
                <div className="ns-step-num">1</div>
                <h4 className="fw-bold">Make an account</h4>
                <p className="text-muted mb-0">
                  Sign up once so your notes stay linked to you.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ns-step">
                <div className="ns-step-num">2</div>
                <h4 className="fw-bold">Add a note</h4>
                <p className="text-muted mb-0">
                  Give it a title, write the details, and add a tag if you want.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ns-step">
                <div className="ns-step-num">3</div>
                <h4 className="fw-bold">Manage them</h4>
                <p className="text-muted mb-0">
                  Come back anytime to view, update, or delete notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ns-cta">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to keep your notes in order?</h2>
          <p className="lead mb-4">
            Create a free account and start writing in less than a minute.
          </p>
          <Link to="/signup" className="btn ns-btn-light btn-lg">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
