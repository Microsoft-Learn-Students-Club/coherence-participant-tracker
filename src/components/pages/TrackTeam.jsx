import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const TrackTeam = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
    }
  };

  const previewStyle = {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '50px',
  };

  return (
    <div style={previewStyle}>
      <h1 className='text-2xl font-semibold my-8'>Scan the QR Code of Team</h1>
      <QrReader
        delay={300}
        onError={(err) => console.error(err)}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {scanResult && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Name:</p>
          {scanResult}
        </div>
      )}
    </div>
  );
};

export default TrackTeam;
