import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/UserLogin';
import Dashboard from './components/pages/Dashboard';
import TrackIndividuals from './components/pages/TrackIndividual';
import TrackTeam from './components/pages/TrackTeam';
import SearchIndividual from './components/pages/SearchIndividual';
import AllRecords from './components/pages/AllRecords';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track-individuals" element={<TrackIndividuals />} />
        <Route path="/track-team" element={<TrackTeam />} />
        <Route path="/track-team" element={<TrackTeam />} />
        <Route path={"/search-by-id"} element={<SearchIndividual />} />
        <Route path={"/search-by-id/:pid"} element={<SearchIndividual />} />
        <Route path="/all-records" element={<AllRecords />} />
      </Routes>
    </Router>
  );
}

export default App;