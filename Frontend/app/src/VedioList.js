import React, { useState, useEffect } from 'react';
import VideoPlayer2 from './components/VideoPlayer2';
import Rating from './components/Rating';
import "./vedio.css";

function App({user}) {
  const [videos, setVideos] = useState([]);
  const userName = user?.name;
 
  useEffect(() => {
    // Fetch the list of available videos from the backend
    fetch('http://localhost:3000/video-list')
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error('Error fetching video list:', error));
  }, []);

  const submitRating = async (videoId, rating) => {
    // This function is here just in case you need it later
    console.log(user);

  };

  return (
    <div className="App">
      <h1>List of Videos</h1>
    
      <ul>
      {videos.map((video) => (
            <li key={video._id}>
               <div id="course-card">
              <VideoPlayer2 video={video} />
              <h3>{video.name}</h3>
              <span>Rating:{video.averageRating}</span>
              {/* Add the Rating component and pass videoId as a prop */}
              <div id="rating">
               <Rating
      videoId={video.videoId}
      onRatingSubmit={submitRating}
      averageRating={video.averageRating} // Pass the average rating as a prop
    />
    </div>
    </div>
    
            </li>
          ))}
      </ul>
    </div>
   
  );
}

export default App;
