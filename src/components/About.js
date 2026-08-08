// useContext is a Hook to use states present in the context.
import React from 'react'
// import noteContext from '../context/notes/NoteContext'
 
export default function About() 
{
  // const a = useContext(noteContext);
  // useEffect runs after return 
  // useEffect(() => {
  //   a.update();
  // }, []);

   return (
    <div className="container py-5">
      {/* Intro */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About Note_Stack</h1>
        <p className="lead text-muted mt-3">
          Note_Stack started as a simple idea: note-taking apps shouldn't
          get in your way. No clutter, no unnecessary steps — just a fast,
          secure place to capture what matters.
        </p>
      </div>

      {/* Mission */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-md-6">
          <h2 className="fw-bold">Our Mission</h2>
          <p className="text-muted">
            We built Note_Stack to give people a distraction-free space to
            think out loud. Whether it's a quick reminder, a task list, or a
            longer train of thought, your notes should be easy to capture
            and just as easy to find again later.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <div className="p-5 bg-light rounded-4 shadow-sm">
            <h1 className="display-1">💡</h1>
          </div>
        </div>
      </div>

      {/* Built With */}
      <div className="mb-5">
        <h2 className="fw-bold text-center mb-4">Built With</h2>
        <div className="row g-4 text-center">
          <div className="col-md-3 col-6">
            <h1>⚛️</h1>
            <p className="text-muted mb-0">React</p>
          </div>
          <div className="col-md-3 col-6">
            <h1>🟢</h1>
            <p className="text-muted mb-0">Node.js & Express</p>
          </div>
          <div className="col-md-3 col-6">
            <h1>🍃</h1>
            <p className="text-muted mb-0">MongoDB</p>
          </div>
          <div className="col-md-3 col-6">
            <h1>🔑</h1>
            <p className="text-muted mb-0">JWT Auth</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <h1>🔒</h1>
              <h4 className="mt-3">Privacy First</h4>
              <p className="text-muted">
                Your notes are tied to your account and yours alone —
                we don't sell data or dig through your content.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <h1>🎯</h1>
              <h4 className="mt-3">Simplicity</h4>
              <p className="text-muted">
                We'd rather do a few things really well than pile on
                features nobody asked for.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <h1>🚀</h1>
              <h4 className="mt-3">Always Improving</h4>
              <p className="text-muted">
                Note_Stack is actively developed, with new features
                shaped by real user feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}