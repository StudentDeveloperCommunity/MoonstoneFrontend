import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ClubDetails from "./pages/ClubDetails.jsx";
import Login from "./admin/Login.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import EventRegistration from "./pages/EventRegistration.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
const AppContent = () => {
  const location = useLocation();
  const excludedPaths = ['/admin','/admin_dashboard'];
  const isExcluded = excludedPaths.includes(location.pathname);
  return (
    <>
    <ScrollToTop/>
      {!isExcluded && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/club" element={<ClubDetails />} />
        <Route path="/register" element={<EventRegistration />} />


        <Route path="/admin" element={<Login />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isExcluded && <Footer />}
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
