import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import AboutUs from "./pages/Aboutus.jsx";
import ClubDetails from "./pages/ClubDetails.jsx";

const AppContent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/club" element={<ClubDetails />} />
      </Routes>

      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
