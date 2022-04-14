import React from 'react';
import Track from './Track';

export default function SongSearch() {
  return (
    <div className="searchResultContainer">
      <div className="songSearch">
        <div className="twoByTwo">
          <span>Title:</span>
          <input type="text" id="searchTitle" />
          <span>Artist:</span>
          <input type="text" id="searchArtist" />
          <span>Album:</span>
          <input type="text" id="searchAlbum" />
        </div>
        <button type="button">&#x1F50D;</button>
      </div>
      <Track />
      <Track />
    </div>
  );
}
