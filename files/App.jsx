import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Welcome from "./pages/Welcome.jsx";

function SitePage({ children }) { return <><Navbar />{children}<Footer /></>; }

export default function App() {
  return <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/home" element={<SitePage><Home /></SitePage>} />
    <Route path="/about" element={<SitePage><About /></SitePage>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Welcome />} />
  </Routes>;
}
