import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';

function AppContent() {

  return (
    <>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Home  />} />
      </Routes>
    <Footer/>

    </>
    
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App
