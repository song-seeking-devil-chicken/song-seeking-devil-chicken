import React, { useState } from 'react';

export default function SongData() {
  const [loading, setLoading] = useState(true);

  function loadSongs() {
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="songData">
        Loading...
        <button type="button" onClick={loadSongs}>Click here to load</button>
      </div>
    );
  }

  return (
    <div className="songData">
      <span>Tempo (BPM):</span>
      <span>100</span>
      <span>Acousticness:</span>
      <span>1</span>
      <span>Danceability:</span>
      <span>1</span>
      <span>Energy:</span>
      <span>1</span>
      <span>Key:</span>
      <span>C#</span>
      <span>Liveness:</span>
      <span>1</span>
      <span>Time Signature</span>
      <span>3/4</span>
      <span>Valence</span>
      <span>1</span>
      <span>Speechiness</span>
      <span>1</span>
    </div>
  );
}
