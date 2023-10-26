import React, { useState, useEffect } from 'react';
import VideoPlayer2 from './components/VideoPlayer2';
import Rating from './components/Rating';
import { NavLink } from 'react-router-dom';
import Top_videos_more from './components/Top_videos_more';
import "./vedio.css";

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
      <NavLink to="/Top_videos_more">
      <button>View More</button></NavLink>
      </div>
    
      <ul id="on_span_p">
      {videos.map((video) => (
            <li key={video._id}>
               <div id="course-card">
              <VideoPlayer2 video={video} />
              <p><span>Course :</span>{video.name}</p>
        <p><span>Rating :</span>{video.averageRating.toFixed(2)}</p>
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
