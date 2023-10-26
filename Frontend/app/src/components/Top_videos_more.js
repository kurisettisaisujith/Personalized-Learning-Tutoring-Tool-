import React, { useState, useEffect } from 'react';
import VideoPlayer2 from './VideoPlayer2';
import Rating from './Rating';
import "./top_videos_more.css";

function App({user}) {
  const [videos, setVideos] = useState([]);
  const userName = user?.name;
 
  useEffect(() => {
    // Fetch the list of available videos from the backend
    fetch('http://localhost:3000/video-list')
      .then((response) => response.json())
      .then((data) => {
        // Sort the videos by average rating (high to low)
        const sortedVideos = data.sort((a, b) => b.averageRating - a.averageRating);
        setVideos(sortedVideos);
      })
      .catch((error) => console.error('Error fetching video list:', error));
  }, []);
  const submitRating = async (videoId, rating) => {
    // This function is here just in case you need it later


  };

  return (
    <div className="App">
      <div id="onclick_h1">
      <span >Top Rated Vedios </span>
      <button>View More</button>
      </div>
    
      <ul id="top_more_vedios">
      {videos.map((video) => (
            <li key={video._id}>
               <div id="course-card">
              <VideoPlayer2 video={video} />
              <h3>{video.name}</h3>
              <span>Rating:{video.averageRating.toFixed(2)}</span>
              {/* Add the Rating component and pass videoId as a prop */}
              <div id="rating">

                
               <Rating
      videoId={video.videoId}
      onRatingSubmit={submitRating}
      averageRating={video.averageRating}
      userName={user ? user.email : ''} 
      userRole={user ? user.role : ''}

      email = {video.facultyEmail}// Pass the average rating as a prop
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
