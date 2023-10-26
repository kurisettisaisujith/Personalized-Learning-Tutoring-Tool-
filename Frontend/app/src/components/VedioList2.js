import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer2 from './VideoPlayer2';
import Rating from './Rating';

function VideoList({ user }) {
  const { searchQuery } = useParams();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchVideos = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/search?query=${query}`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching video data:', error);
      setError(error);
    }
  }

  // Function to submit a rating, but it won't be used in this component
  const submitRating = async (videoId, rating) => {
    // This function is here just in case you need it later


  };

  useEffect(() => {
    setError(null); // Clear previous errors
    if (searchQuery === '') {
      // If searchQuery is empty, fetch all videos from the server
      fetchVideos('');
    } else {
      fetchVideos(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="App">
    <br/>
      <span >Resultend Vedios </span>
    
     
    
      <ul>
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

export default VideoList;
