import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import AuthState from "./context/auth/authState";
import ThemeState from "./context/theme/themeState";

function App() {
  return (
    <ThemeState>
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword/:token" element={<ResetPassword />} /> */}
              </Routes>
            </main>
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </ThemeState>
  );
}

export default App;