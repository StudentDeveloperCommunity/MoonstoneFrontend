import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./admin/Login.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import EventRegistration from "./pages/EventRegistration.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Eventsindetails from "./pages/Eventsindetails.jsx";
import Payment from "./pages/Payment.jsx";
import CheckRegistrationStatus from "./pages/CheckRegistrationStatus.jsx";
import Developers from "./pages/Developers.jsx";
import NotFound from "./pages/NotFound.jsx";
// import Sponsers from "./components/Sponsors.jsx";
const AppContent = () => {
  const location = useLocation();
  const excludedPaths = ['/admin','/admin_dashboard','/payment'];
  const isExcluded = excludedPaths.includes(location.pathname);
  return (
    <>
    <ScrollToTop/>
      {!isExcluded && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/register" element={<EventRegistration />} />
        <Route path="/eventsindetails" element={<Eventsindetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/check-registration" element={<CheckRegistrationStatus />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
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
