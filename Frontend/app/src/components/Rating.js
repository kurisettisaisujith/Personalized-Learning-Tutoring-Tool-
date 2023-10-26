import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Rating({ videoId, onRatingSubmit, averageRating, userName, userRole,email}) {
  const [rating, setRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleRatingSubmit = () => {
    axios
      .post('http://localhost:3000/submit-video-rating', {
        videoId,
        studentId: userName,
        rating,
        facultyEmail: 'faculty@example.com',
      })
      .then((response) => {
        console.log('Rating submitted successfully:', response.data);

        setIsRatingSubmitted(true);

        window.alert('Rating submitted successfully. Thank you!');

        onRatingSubmit(videoId, rating);
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
        // Handle errors (e.g., show an error message)
      });
  }

  if (isRatingSubmitted) {
    return (
      <div>
        <p>rating successfull</p>
      </div>
    );
  }

  if (userRole !== 'student') {
    return (
      <div>
        <p></p>
      </div>
    );
  }

  return (
    <div>
      <select value={rating} onChange={handleRatingChange}>
        <option>Select</option>
        <option value={1}>1 STAR</option>
        <option value={2}>2 STARS</option>
        <option value={3}>3 STARS</option>
        <option value={4}>4 STARS</option>
        <option value={5}>5 STARS</option>
      </select>
      <button onClick={handleRatingSubmit}>Submit Rating</button>
    </div>
  );
}

export default Rating;
