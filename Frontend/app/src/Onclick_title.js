import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Onclick_title.css";
import "./vedio.css";
import VideoPlayer2 from './components/VideoPlayer2';
import Rating from './components/Rating';
import Onclick_title from './Onclick_title';
import { NavLink } from 'react-router-dom';

function App({user}) {
  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('All'); // Default to 'All'

  useEffect(() => {
    // Fetch the list of available videos from the backend
    fetchTitles();
  }, []);

  useEffect(() => {
    // When the selected title changes, fetch videos based on the selection
    fetchVideos();
  }, [selectedTitle]);

  const fetchVideos = async () => {
    if (selectedTitle === 'All') {
      // Fetch all videos when 'All' is selected
      const response = await axios.get('http://localhost:3000/video-list');
      setVideos(response.data);
    } else {
      // Fetch videos based on the selected title
      const response = await axios.get(`http://localhost:3000/videos-by-title/${selectedTitle}`);
      setVideos(response.data);
    }
  };

  const fetchTitles = async () => {
    // Fetch unique video titles
    const response = await axios.get('http://localhost:3000/video-titles');
    setTitles(['All', ...response.data]); // Include 'All' as the default option
  };

  const handleTitleClick = (title) => {
    // Set the selected title when a title is clicked
    setSelectedTitle(title);
  };
  const submitRating = async (videoId, rating) => {
    // This function is here just in case you need it later


  };

  return (
    <div className="App">
        <div id="onclick_h1">
        <span id="onclick_h1">Best Courses</span><NavLink to="/Onclick_title">
      <button>View All</button></NavLink>
      </div>
    
   
      <div className="titles">
        {titles.map((title) => (
          <button
            key={title}
            className={selectedTitle === title ? 'selected-title' : 'title'}
            onClick={() => handleTitleClick(title)}
          >
            {title}
          </button>
        ))}
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
