import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import Eventsindetails from "./pages/Eventsindetails.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ClubDetails from "./pages/ClubDetails.jsx";
import Registration from "./pages/Registration.jsx";

const AppContent = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/club" element={<ClubDetails />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/eventsindetails" element={<Eventsindetails />} />
      </Routes>

      <Footer />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
