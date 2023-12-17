import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTrackIndividuals = () => {
    // Redirect to the page for tracking individuals
    navigate('/track-individuals');
  };

  const handleTrackTeam = () => {
    // Redirect to the page for tracking teams
    navigate('/track-team');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="bg-white shadow-md rounded-md p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <div className="flex space-x-4">
          {/* Track Individuals Button */}
          <button
            className="flex-1 bg-blue-500 text-white text-2xl font-bold py-3 rounded-md"
            onClick={handleTrackIndividuals}
          >
            Track Individuals
          </button>

          {/* Track Team Button */}
          <button
            className="flex-1 bg-green-500 text-white text-2xl font-bold py-3 rounded-md h-36"
            onClick={handleTrackTeam}
          >
            Track Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
