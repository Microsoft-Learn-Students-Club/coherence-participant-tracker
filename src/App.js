import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/UserLogin';
import Dashboard from './components/pages/Dashboard';
import TrackIndividuals from './components/pages/TrackIndividual';
import TrackTeam from './components/pages/TrackTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track-individuals" element={<TrackIndividuals />} />
        <Route path="/track-team" element={<TrackTeam />} />
      </Routes>
    </Router>
  );
}

export default App;