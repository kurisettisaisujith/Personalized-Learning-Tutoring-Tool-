import React, { useState, useEffect } from 'react';
import VideoPlayer2 from './VideoPlayer2'; // Import your VideoPlayer component

function FacultyVedios({ facultyEmail }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch videos related to the faculty's email when the component mounts
    fetch(`http://localhost:3000/faculty/videos/${facultyEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.error('Error fetching faculty videos:', error));
  }, [facultyEmail]);

  return (
    <div>
      <h2>Videos Uploaded by Faculty</h2><br/><br/>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            
            <VideoPlayer2 video={video} autoPlay={false} />
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyVedios;
