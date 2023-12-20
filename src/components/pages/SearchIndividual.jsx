import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../authentication/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchIndividual = () => {
  const navigate = useNavigate();
  const { pid: urlPid } = useParams(); // Get PID from URL params
  const [pid, setPid] = useState(urlPid || ""); // Use URL PID or initialize as an empty string
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (urlPid) {
      // If PID is present in URL params, trigger search on mount
      handleSearch();
    }
  }, [urlPid]);

  const handleBackButtonClick = () => {
    navigate("/dashboard"); // Navigate to the "dashboard" route
  };

  const handleSearch = async () => {
    try {
      // Reference to the "individuals" collection
      const individualsCollection = collection(firestore, "individuals");

      // Create a query to get documents where the "pid" field matches the provided value
      const q = query(individualsCollection, where("pid", "==", pid));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if there are matching documents
      if (!querySnapshot.empty) {
        // Assuming there is only one document matching the PID
        const doc = querySnapshot.docs[0];
        const userData = doc.data();
        toast.success("Participant's Data fetched!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Set the user data to display
        setUserData(userData);
      } else {
        // No matching documents found
        setUserData(null);
        toast.error("No such participant found!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setUserData(null);
      toast.error("Error fetching data", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-center">
        Search Participant by PID
      </h1>

      <div className="flex items-center mb-4">
        <label className="mr-4">Enter PID:</label>
        <input
          type="text"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          className="p-2 border rounded-md text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-purple-500 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>

      {userData && (
        <div className="text-xl font-light md:text-lg text-left text-white bg-transparent p-4 rounded-md border-2 border-white mt-4 md:mt-8 lg:mt-12 w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-xl font-bold mb-3 text-white">
            Participant Information:
          </h1>
          <p className="text-4xl font-semibold text-center">{userData.name}</p>
          {userData.isLead && userData.isLead !== "false" && (
            <p className="text-xl font-light text-center italic">
              (Leader of team "{userData.teamName}")
            </p>
          )}
          <br />
          <p
            onClick={() => (window.location.href = `mailto:${userData.email}`)}
          >
            <span className="font-semibold mt-8">Email:</span> {userData.email}
          </p>

          <p onClick={() => (window.location.href = `tel:${userData.contact}`)}>
            <span className="font-semibold">Contact:</span> {userData.contact}
          </p>
          <p>
            <span className="font-semibold">College:</span> {userData.college}
          </p>
          <p>
            <span className="font-semibold">Medical Info:</span>{" "}
            {userData.medinfo}
          </p>
          <p>
            <span className="font-semibold">Team Name:</span>{" "}
            {userData.teamName}
          </p>
          <p>
            <span className="font-semibold">Year of Study:</span>{" "}
            {userData.year}
          </p>
          <br />
          <p className="text-center font-semibold text-white text-2xl mb-2">
            Refreshment Remarks
          </p>
          {userData.hadLunch && userData.hadLunch !== "false" && (
            <p className="text-white">Lunch has been provided.</p>
          )}
          {userData.hadTea && userData.hadTea !== "false" && (
            <p className="text-white">High Tea has been provided.</p>
          )}
          {userData.hadDinner && userData.hadDinner !== "false" && (
            <p className="text-white">Dinner has been provided.</p>
          )}
          {userData.hadMidnightSnack &&
            userData.hadMidnightSnack !== "false" && (
              <p className="text-white">Midnight Snacks has been provided.</p>
            )}
          {userData.hadBreakfast && userData.hadBreakfast !== "false" && (
            <p className="text-white">Breakfast has been provided.</p>
          )}
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={handleBackButtonClick}
              className="bg-purple-500 text-white py-2 px-4 rounded-md mt-4 mx-auto w-full"
            >
              Back
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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

export default SearchIndividual;
