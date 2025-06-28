import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import BudgetApp from "./components/BudgetApp/BudgetApp";
import DailyNotes from "./components/DailyNotes/DailyNotes";
import GoalApp from "./components/GoalApp/GoalApp";
import ProfilePage from "./components/Profile/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/money" element={<BudgetApp />} />
        <Route path="/day" element={<DailyNotes />} />
        <Route path="/goals" element={<GoalApp />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
