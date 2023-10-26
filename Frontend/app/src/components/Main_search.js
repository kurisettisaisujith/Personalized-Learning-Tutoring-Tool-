import React, { useState } from 'react';
import VideoSearch from './VideoSearch';
import VedioList2 from './VedioList2';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
    
      <VideoSearch handleSearch={handleSearch} />
      <VedioList2 searchQuery={searchQuery} />
    </div>
  );
}

export default App;