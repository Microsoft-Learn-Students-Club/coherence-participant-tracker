import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../authentication/firebase";

const TrackIndividual = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (scanResult && showResult) {
      const fetchData = async () => {
        try {
          const docRef = doc(firestore, "individuals", scanResult);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };

      fetchData();
    }
  }, [scanResult, showResult]);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
    }
  };

  const handleButtonClick = () => {
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* The content of your component */}
      <h1 className="text-2xl font-semibold my-8">
        Scan the QR Code of Individual
      </h1>
      {!userData && (
        <>
          <div className="w-72 h-72 mx-auto border-2 border-black rounded-lg">
            <QrReader
              delay={300}
              onError={(err) => console.error(err)}
              onScan={handleScan}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-8"
          >
            Get Data
          </button>
        </>
      )}
      {userData && showResult && (
        <div className="text-xl text-left bg-gray-100 p-4 rounded-md shadow-md mt-8">
          <p className="mb-2 text-2xl font-semibold text-center">
            {userData.name}
          </p>
          <p>Email: {userData.email}</p>
          <p>Contact: {userData.contact}</p>
          <p>College: {userData.college}</p>
          <p>Medical Info: {userData.medinfo}</p>
          <p>Team Name: {userData.teamName}</p>
          <p>Year of Study: {userData.year}</p>
          <p>Lunch?: {userData.hadLunch ? "Yes" : "No"}</p>
          <p>High Tea?: {userData.hadTea ? "Yes" : "No"}</p>
          <p>Dinner?: {userData.hadDinner ? "Yes" : "No"}</p>
          <p>Midnight Snacks?: {userData.hadMidnightSnack ? "Yes" : "No"}</p>
          <p>Breakfast?: {userData.hadBreakfast ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default TrackIndividual;
