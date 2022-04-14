import React, { useState } from 'react';
import SongSearch from '../components/SongSearch';
import SongData from '../components/SongData';

export default function SearchContainer() {
  const [data, setData] = useState({})
  
  return (
    <div className="searchContainer">
      <SongSearch setData={setData} />
      <SongData data={data} />
    </div>
  );
}
