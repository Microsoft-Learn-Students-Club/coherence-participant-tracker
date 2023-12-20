import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../authentication/firebase";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AllRecord = () => {
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "individuals"));
      const participantsData = [];
      
      querySnapshot.forEach((doc) => {
        participantsData.push({ id: doc.id, ...doc.data() });
      });

      setParticipants(participantsData);
      toast.success("All participant's Data fetched!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error fetching participants:", error);
      toast.error("No participant data found!", {
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

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <br />
      <br />

      <h1 className="text-4xl font-bold mb-6 text-white text-center">All Participants</h1>

      {participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2">
          {participants.map((participant) => (
            <Link
              key={participant.id}
              to={`/search-by-id/${participant.pid}`} // Use the participant PID in the URL
              className="text-xl md:text-lg text-left text-white bg-transparent p-4 rounded-md border-2 border-white mt-4 block"
            >
              <p className="text-2xl font-semibold">{participant.pid} : {participant.name}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No participants found.</p>
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

export default AllRecord;
