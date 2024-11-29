import React, { useState, useRef } from 'react';
import attechment from '../Icons/attachment.png';  // Attachment icon
import camera from '../Icons/camera.png';  // Camera icon
import voice from '../Icons/voice.png';  // Voice icon
import emoji from '../Icons/emojis.png';  // Emoji icon

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');  // State for the message input
  const [file, setFile] = useState(null);  // State for storing the selected file
  const [isCameraOpen, setIsCameraOpen] = useState(false);  // State for camera visibility
  const videoRef = useRef(null);  // Reference to video element

  // Handle file selection (triggered when a file is selected)
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);  // Store the selected file in state
    }
  };

  // Handle form submission (send message and file)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If either a message or file is available, we send the data
    if (message.trim() || file) {
      // Create a FormData object
      const formData = new FormData();
      formData.append('message', message);  // Append the message
      if (file) {
        formData.append('file', file);  // Append the selected file
      }

      // Call the parent function to send the data (e.g., sending it to an API)
      await onSendMessage(formData);

      // Clear the inputs after sending
      setMessage('');
      setFile(null);
    }
  };

  // Trigger file input click when attachment icon is clicked
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // Function to open camera
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;  // Set the video stream as the source
      setIsCameraOpen(true);  // Show the camera
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Unable to access camera. Please check your permissions.");
    }
  };

  // Function to close the camera
  const closeCamera = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());  // Stop the tracks to close the camera
      videoRef.current.srcObject = null;  // Clear the video source
    }
    setIsCameraOpen(false);  // Hide the camera
  };

  return (
    <div className="chat-input border-none">
      <form onSubmit={handleSubmit} className="d-flex">
        <div className="input-group border-none" style={{ position: 'relative' }}>
          {/* Emoji button inside the input field */}
          <button type="button" className="btn" style={{ position: 'absolute', left: '10px', top: '10%', transform: 'translateY(-50%)' }}>
            <img src={emoji} alt="emoji" />
          </button>

          {/* Message input field */}
          <input
            type="text"
            className="rounded-5 shadow border-0"
            style={{ width: "1160px", paddingLeft: '60px' }}  // Add left padding for buttons
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  // Update message on change
          />

          {/* Attachment button inside the input field */}
          <button type="button" className="btn" style={{ position: 'absolute', right: '50px', top: '10%', transform: 'translateY(-50%)' }} onClick={triggerFileInput}>
            <img src={attechment} alt="attachment" />
          </button>

          {/* Hidden file input to upload file */}
          <input
            id="fileInput"
            type="file"
            accept="image/*, .pdf, .docx, .txt, .png, .jpg, .jpeg"  // Accept images and other files
            style={{ display: 'none' }}  // Hide the file input field
            onChange={handleFileSelect}  // Handle file selection
          />
          
          {/* Camera button inside the input field */}
          <button type="button" className="btn" style={{ position: 'absolute', right: '20px', top: '10%', transform: 'translateY(-50%)' }} onClick={openCamera}>
            <img src={camera} alt="camera" />
          </button>
        </div>

        {/* Send button */}
        <button type="submit" className="btn">
          <img
            style={{ height: '70px', marginLeft: '20px',marginBottom:"7px"}}
            src={voice}
            alt="voice"
          />
        </button>
      </form>

      {/* Camera stream display */}
      {isCameraOpen && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline width="300" height="200" />
          <button type="button" onClick={closeCamera}>Close Camera</button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
