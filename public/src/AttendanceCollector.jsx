import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceCollector = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [
    capturedImage, setCapturedImage] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [cameraOn, setCameraOn] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const webcamRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNameChange = (e) => setName(e.target.value);

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleImageCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    alert('Photo captured successfully!');
  };

  const markAttendance = (isPresent) => {
    if (name.trim() !== '' && address.trim() !== '') {
      const time = currentDateTime.toLocaleTimeString();
      const date = currentDateTime.toLocaleDateString();

      setAttendanceList([...attendanceList, {
        capturedImage,
        name: name.trim(),
        address: address.trim(),
        time,
        date,
        present: isPresent
      }]);

      setName('');
      setAddress('');
      setCapturedImage(''); // Clear the captured image after marking attendance
    } else {
      alert('Please fill in all fields.');
    }
  };

  const saveData = () => {
    if (attendanceList.length > 0) {
      alert('Data saved successfully!');
    } else {
      alert('No data to save.');
    }
  };

  const toggleCamera = () => setCameraOn(!cameraOn);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Attendance Collector</h2>
          <div className="mb-3">
            <label>Current Date and Time: </label>
            <span>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
          </div>
          <div className="mb-3">
            <input className="form-control" type="text" value={name} onChange={handleNameChange} placeholder="Enter Name" />
          </div>
          <div className="mb-3">
            <input className="form-control" type="text" value={address} onChange={handleAddressChange} placeholder="Enter Address" />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={toggleCamera}>
              {cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            </button>
          </div>
          <div className="mb-3">
            <button className="btn btn-secondary" onClick={handleImageCapture}>Capture Photo</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-success" onClick={() => markAttendance(true)}>Mark Present</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-danger" onClick={() => markAttendance(false)}>Mark Absent</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-info" onClick={saveData}>Save Data</button>
          </div>
          {cameraOn && (
            <div className="mb-3">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </div>
          )}
          {capturedImage && (
            <div className="mb-3">
              <img src={capturedImage} alt="Captured" className="img-fluid" />
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h3>Attendance List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Captured Photo</th>
                <th>Name</th>
                <th>Address</th>
                <th>Time</th>
                <th>Date</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((entry, index) => (
                <tr key={index}>
                  <td>
                    <img src={entry.capturedImage} alt="Captured" style={{ maxWidth: '100px' }} />
                  </td>
                  <td>{entry.name}</td>
                  <td>{entry.address}</td>
                  <td>{entry.time}</td>
                  <td>{entry.date}</td>
                  <td>{entry.present ? 'Present' : 'Absent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCollector;
