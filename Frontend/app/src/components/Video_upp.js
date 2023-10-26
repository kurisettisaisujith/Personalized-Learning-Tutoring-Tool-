import React, { useState } from 'react';
import axios from 'axios';
import './All_Log.css';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    name: '', // Changed 'originalnam' to 'name'
    description: '',
    rated: '',
    tags: '',
    path: '', // Add a path field
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    // Append the 'name' attribute to the formData
    formData.append('name', videoDetails.name);

    // Add other video details to the formData
    Object.entries(videoDetails).forEach(([key, value]) => {
      if (key !== 'name') {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update the path in the video details
      setVideoDetails({ ...videoDetails, path: response.data.path });

      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <div>
       <div className="container1">
      <h1>Video Upload</h1>
      <label htmlFor="file">File:</label>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <label htmlFor="text">VideoName:</label>
      <input
        type="text"
        name="name" // Use "name" as the attribute name
        placeholder="Video Name"
        value={videoDetails.name}
        onChange={handleTextChange}
      />
       <label htmlFor="text">Email</label>
        <input
        type="text"
        name="facultyEmail" // Add the input field for faculty email
        placeholder="Faculty Email"
        value={videoDetails.facultyEmail}
        onChange={handleTextChange}
      />
       <label htmlFor="text">Tages</label>
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={videoDetails.tags}
        onChange={handleTextChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        placeholder="Video Description"
        value={videoDetails.description}
        onChange={handleTextChange}
      />
      
     
      
      {/* Display the file path */}
      <p>File Path: {videoDetails.path}</p>
      <button onClick={handleUpload} id="button1">Upload Video</button>
    </div>
    </div>
  );
};

export default VideoUpload;
