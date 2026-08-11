// useContext is a Hook to use states present in the context.
import React from "react";
import { Link } from "react-router-dom";
// import noteContext from '../context/notes/NoteContext'

export default function About() {
  // const a = useContext(noteContext);
  // useEffect runs after return
  // useEffect(() => {
  //   a.update();
  // }, []);

  return (
    <div className="container pb-5">
      {/* Intro */}
      <div className="ns-about-hero">
        <h1 className="ns-section-title">About Note_Stack</h1>
        <p className="lead text-muted mt-3 mx-auto" style={{ maxWidth: "48ch" }}>
          Note_Stack is a simple place to save your thoughts, reminders, and
          important information — without clutter or confusion.
        </p>
      </div>

      {/* Mission */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-md-6">
          <div className="ns-about-panel">
            <div className="ns-about-mark" aria-hidden="true">
              ✎
            </div>
            <h2 className="fw-bold mb-3">Why we made it</h2>
            <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
              We wanted a note app that feels easy from the first click. Write
              something down, find it later, and keep everything private — that
              is the whole idea.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="ns-about-panel">
            <div className="ns-about-mark" aria-hidden="true">
              ✓
            </div>
            <h2 className="fw-bold mb-3">Who it is for</h2>
            <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
              Students, professionals, or anyone who wants a clean space for
              daily notes. If you need somewhere calm to keep track of ideas,
              Note_Stack fits.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="text-center mb-4">
        <h2 className="ns-section-title">What matters to us</h2>
        <p className="ns-section-sub mt-2">
          Short and clear — so you always know what to expect.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card ns-card h-100 border-0">
            <div className="card-body text-center">
              <div className="ns-card-icon" aria-hidden="true">
                ◎
              </div>
              <h4 className="ns-card-title">Your notes stay private</h4>
              <p className="ns-card-text">
                After you log in, only you can see your notes. We do not share
                your content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card ns-card h-100 border-0">
            <div className="card-body text-center">
              <div className="ns-card-icon" aria-hidden="true">
                ◇
              </div>
              <h4 className="ns-card-title">Easy to use</h4>
              <p className="ns-card-text">
                No complicated menus. Write a note, save it, and move on with
                your day.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card ns-card h-100 border-0">
            <div className="card-body text-center">
              <div className="ns-card-icon" aria-hidden="true">
                ▲
              </div>
              <h4 className="ns-card-title">Keeps getting better</h4>
              <p className="ns-card-text">
                We keep improving Note_Stack based on what users actually need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="ns-cta rounded-4 text-center px-3">
        <h2 className="fw-bold mb-3">Want to try it?</h2>
        <p className="lead mb-4">
          Create an account and start saving notes in under a minute.
        </p>
        <Link to="/signup" className="btn ns-btn-light btn-lg">
          Get Started
        </Link>
      </div>
    </div>
  );
}
