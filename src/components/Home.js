import React, { useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";

export default function Home() {
  const context = useContext(noteContext);
  const { notes } = context;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 className="display-4 fw-bold">
              Organize Your Thoughts with Note_Stack
            </h1>

            <p className="lead text-muted mt-3">
              A simple and secure full-stack note management application
              that helps you create, manage, and organize your personal notes.
            </p>

            <Link to="/signup" className="btn btn-primary btn-lg mt-3">
              Get Started
            </Link>

            <Link
              to="/about"
              className="btn btn-outline-secondary btn-lg mt-3 ms-2"
            >
              Learn More
            </Link>
          </div>

          <div className="col-md-5 text-center mt-4 mt-md-0">
            <div className="p-5 bg-light rounded-4 shadow-sm">
              <h1 className="display-1">📝</h1>
              <h3 className="mt-3">Your Notes. Your Space.</h3>
              <p className="text-muted">
                Keep your ideas, tasks, and important information organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Notes Section */}
      <section className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Your Notes</h2>
          <p className="text-muted">
            Access and manage your personal notes from one place.
          </p>
        </div>

        <div className="row g-4">
          {notes.length === 0 ? (
            <div className="col-12 text-center">
              <div className="p-4 bg-light rounded-4">
                <h4>No Notes Found</h4>
                <p className="text-muted">
                  You haven't created any notes yet.
                </p>

                <Link to="/addnote" className="btn btn-primary">
                  Create Your First Note
                </Link>
              </div>
            </div>
          ) : (
            notes.map((note) => (
              <div className="col-md-4" key={note._id}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {note.title}
                    </h5>

                    <p className="card-text text-muted">
                      {note.description}
                    </p>

                    <span className="badge bg-primary">
                      {note.tag}
                    </span>
                  </div>

                  <div className="card-footer bg-white border-0">
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

      {/* Features Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Everything You Need to Manage Notes
            </h2>

            <p className="text-muted">
              Powerful and simple features designed for everyday note management.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>✍️</h1>
                  <h4 className="card-title mt-3">Create Notes</h4>
                  <p className="card-text text-muted">
                    Quickly create notes and save important information
                    in one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>✏️</h1>
                  <h4 className="card-title mt-3">Edit & Update</h4>
                  <p className="card-text text-muted">
                    Easily update your notes whenever your information
                    changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>🗑️</h1>
                  <h4 className="card-title mt-3">Delete Notes</h4>
                  <p className="card-text text-muted">
                    Remove old or unnecessary notes whenever you want.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>🔐</h1>
                  <h4 className="card-title mt-3">Secure Authentication</h4>
                  <p className="card-text text-muted">
                    JWT-based authentication keeps your personal notes
                    protected.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>🏷️</h1>
                  <h4 className="card-title mt-3">Organize with Tags</h4>
                  <p className="card-text text-muted">
                    Add tags to your notes to keep related information
                    organized.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <h1>⚡</h1>
                  <h4 className="card-title mt-3">Fast & Simple</h4>
                  <p className="card-text text-muted">
                    A clean interface that makes managing your notes
                    straightforward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How Note_Stack Works</h2>
          <p className="text-muted">
            Manage your notes in three simple steps.
          </p>
        </div>

        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="mb-3">
              <span className="badge bg-primary rounded-circle p-3 fs-5">
                1
              </span>
            </div>

            <h4>Create an Account</h4>

            <p className="text-muted">
              Register and securely access your personal note space.
            </p>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <span className="badge bg-primary rounded-circle p-3 fs-5">
                2
              </span>
            </div>

            <h4>Create Your Notes</h4>

            <p className="text-muted">
              Add titles, descriptions, and tags to your notes.
            </p>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <span className="badge bg-primary rounded-circle p-3 fs-5">
                3
              </span>
            </div>

            <h4>Manage Everything</h4>

            <p className="text-muted">
              View, update, or delete your notes whenever you need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold">
            Ready to Organize Your Notes?
          </h2>

          <p className="lead mt-3">
            Start managing your notes with Note_Stack today.
          </p>

          <Link to="/signup" className="btn btn-light btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}