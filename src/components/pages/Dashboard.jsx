import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../authentication/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = getAuth(); // Get current user and logout function from your authentication context

  const handleTrackIndividuals = () => {
    // Redirect to the page for tracking individuals
    navigate("/track-individuals");
  };

  const handleTrackTeam = () => {
    // Redirect to the page for tracking teams
    navigate("/track-team");
  };

  const handleSearchByID = () => {
    // Redirect to the page for tracking individuals
    navigate("/search-by-id");
  };

  const handleAllRecords = () => {
    // Redirect to the page for tracking individuals
    navigate("/all-records");
  };

  const userName = currentUser.email.split("@")[0];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
        toast.success("Logged out ✅", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gray-950">
      <section className="bg-transparent rounded-md p-8 max-w-md w-full text-center">
        <h2 className="text-4xl font-semibold mb-4 text-white">
          Hello {userName}!
        </h2>
        <br />

        <div className="flex space-x-4">
          {/* Track Individuals Button */}
          <button
            className="flex-1 bg-transparent border-2 text-white text-2xl font-semibold py-3 rounded-md"
            onClick={handleTrackIndividuals}
          >
            Track Individuals
          </button>

          {/* Track Team Button */}
          <button
            className="flex-1 bg-transparent border-2 text-white text-2xl font-semibold py-3 rounded-md h-36"
            onClick={handleTrackTeam}
          >
            Track Team
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
          {/* Search Individuals Button */}
          <button
            className="flex-1 bg-transparent border-2 text-white text-2xl font-semibold py-3 rounded-md"
            onClick={handleSearchByID}
          >
            Search by PID
          </button>

          {/* Show All Button */}
          <button
            className="flex-1 bg-transparent border-2 text-white text-2xl font-semibold py-3 rounded-md h-36"
            onClick={handleAllRecords}
          >
            All Records
          </button>
          
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-purple-800 text-white py-2 px-4 mt-6 rounded-md"
        >
          Logout
        </button>
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Dashboard;
