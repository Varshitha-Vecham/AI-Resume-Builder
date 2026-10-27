import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import IntegrationPlaceholder from "./pages/IntegrationPlaceholder.jsx";
import Welcome from "./pages/Welcome.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Navbar />
            <IntegrationPlaceholder />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
