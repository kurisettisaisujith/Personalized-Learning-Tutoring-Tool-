import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer2 from './VideoPlayer2';
import Rating from './Rating';

function FacultyVideos({user}) {
  const { email } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/faculty/videos/${email}`)
      .then(async (response) => {
        // Check if the response is not OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check the content type of the response
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not in JSON format');
        }

        // Parse the response as JSON
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setError('Error fetching videos.');
        setLoading(false);
      });
  }, [email]);
  const submitRating = async (videoId, rating) => {
    // This function is here just in case you need it later


  };

  return (
    <div>
      <h2>Videos for Faculty: {email}</h2>
      {loading && <p>Loading videos...</p>}
      {error && <p>{error}</p>}
      <div className="App">
      <span>List of Videos (Sorted by Average Rating) </span>
    
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

      email = {video.facultyEmail} // Pass the average rating as a prop
    />
    </div>
    </div>
    
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
}

export default FacultyVideos;
