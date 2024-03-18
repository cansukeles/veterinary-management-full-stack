import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ReportsPage from "./pages/ReportsPage";
import VaccinesPage from "./pages/VaccinesPage";
import DoctorsPage from "./pages/DoctorsPage";
import AnimalsPage from "./pages/AnimalsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/vaccines" element={<VaccinesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
