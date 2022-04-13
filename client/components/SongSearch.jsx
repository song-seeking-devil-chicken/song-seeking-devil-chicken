import React from 'react';

export default function SongSearch() {
  return (
    <div className="songSearch">
      <select id="searchCategory">
        <option value="songTitle">Title</option>
        <option value="songAlbum">Album</option>
        <option value="songArtist">Artist</option>
      </select>
      <input type="text" />
    </div>
  );
}
