import React from 'react';
import SongSearch from '../components/SongSearch';
import SongData from '../components/SongData';

export default function SearchContainer() {
  return (
    <div className="searchContainer">
      <SongSearch />
      <SongData />
    </div>
  );
}
