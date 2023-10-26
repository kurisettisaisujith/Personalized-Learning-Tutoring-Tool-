import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './videosearch.css';

const VideoSearch = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="video-search-container">
       <div className="search-bar"></div>
      <form>
        <input
          type="text"
          placeholder="Search for videos..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={`/videos/${query}`}>
          <button type="submit" className="search-button">Search</button>
        </Link>
      </form>
    </div>
  );
};

export default VideoSearch;
