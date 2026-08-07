import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-center mt-4">
                This is a Full Stack Application - Note_Stack
              </h2>
            }
          />
          <Route
            path="/about"
            element={<About/>}
          />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;