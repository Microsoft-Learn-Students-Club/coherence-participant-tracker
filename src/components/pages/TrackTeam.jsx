import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "react-qr-scanner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../authentication/firebase";
import { Switch } from "@headlessui/react";

const MyToggle = ({ label, initialValue = false, onChange }) => {
  const [enabled, setEnabled] = useState(initialValue);

  const handleToggle = () => {
    setEnabled(!enabled);
    onChange(!enabled);
  };

  return (
    <div className="flex items-center space-x-4">
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <p>{label}</p>
    </div>
  );
};

const TrackTeam = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userData, setUserData] = useState(null);
  const [localChanges, setLocalChanges] = useState({});
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (scanResult && showResult) {
      const fetchData = async () => {
        try {
          const docRef = doc(firestore, "teams", scanResult);
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
    setIsScanning(false);
  };

  const handleToggleChange = (field) => {
    setLocalChanges((prevChanges) => ({
      ...prevChanges,
      [field]: !prevChanges[field],
    }));
  };

  const handleBackButtonClick = () => {
    navigate("/dashboard"); // Navigate to the "dashboard" route
  };

  const handleUpdateButtonClick = async () => {
    try {
      const docRef = doc(firestore, "teams", scanResult);
      await updateDoc(docRef, localChanges);
      setLocalChanges({});
      console.log("Document updated successfully!");
      setIsScanning(true);
      setShowResult(false);
      setUserData(null);
      setScanResult(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8 lg:p-12">
      {!userData && isScanning && (
        <>
          <h1 className="text-2xl font-semibold my-4 md:my-8 lg:my-12">
            Scan the QR Code of Team
          </h1>
          <div className="w-full md:w-3/4 lg:w-1/2 mx-auto border-2 border-black rounded-lg">
            <QrReader
              delay={300}
              onError={(err) => console.error(err)}
              onScan={handleScan}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="px-4">
            <button
              onClick={handleButtonClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 md:mt-8 lg:mt-12"
            >
              Get Data
            </button>{" "}
            &nbsp;&nbsp;
            <button
              onClick={handleBackButtonClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 md:mt-8 lg:mt-12"
            >
              Back
            </button>
          </div>
        </>
      )}
      {userData && showResult && !isScanning && (
        <div className="text-xl text-left bg-gray-100 p-4 rounded-md shadow-md mt-4 md:mt-8 lg:mt-12 w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-2xl text-center font-semibold my-4 md:my-8 lg:my-12">
            Team Details
          </h1>
          <p className="mb-6 text-4xl font-bold text-center">
            {userData.teamName}
          </p>
          <p className="text-2xl font-semibold text-center">
            <span className="font-semibold">Team Leader:</span>{" "}
            {userData.teamLead}
          </p>
          <p>
            <span className="font-semibold">Member 1:</span> {userData.member1}
          </p>
          {userData.member2 && userData.member2 !== "NA" && (
            <p>
              <span className="font-semibold">Member 2:</span>{" "}
              {userData.member2}
            </p>
          )}
          {userData.member3 && userData.member3 !== "NA" && (
            <p>
              <span className="font-semibold">Member 3:</span>{" "}
              {userData.member3}
            </p>
          )}
          {userData.member4 && userData.member4 !== "NA" && (
            <p>
              <span className="font-semibold">Member 4:</span>{" "}
              {userData.member4}
            </p>
          )}

          <p>
            <span className="font-semibold">College:</span>{" "}
            {userData.leadCollege}
          </p>
          <br />
          <br />
          <p className="text-center text-2xl">Evaluation Details</p>
          <MyToggle
            label="Evaluation Round - 1"
            initialValue={userData.isFirstEvalDone}
            onChange={() => handleToggleChange("isFirstEvalDone")}
          />
          <MyToggle
            label="Evaluation Round - 2"
            initialValue={userData.isSecondEvalDone}
            onChange={() => handleToggleChange("isSecondEvalDone")}
          />
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={handleUpdateButtonClick}
              className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 mx-auto"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackTeam;
