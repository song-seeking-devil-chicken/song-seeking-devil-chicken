import React, { useState } from 'react';

export default function SongData() {
  const [loading, setLoading] = useState(true);

  function loadSongs() {
    setLoading(false);
    
    async function getData() {
      return fetch('/api/call/me').then((res) => res.json()).then((res) => {
        console.log(res);
      })
    }
    
    getData();
  }

  if (loading) {
    return (
      <div>
        Loading...
        <button type="button" onClick={loadSongs}>Click here to load</button>
      </div>
    );
  }

  return (
    <div className="songData">
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
    </div>
  );
}
