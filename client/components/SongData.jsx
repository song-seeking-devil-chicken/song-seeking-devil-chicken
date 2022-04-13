import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";

export default function SongData() {
  const [loading, setLoading] = useState(true);
  const authStatus = useOutletContext();

  function loadSongs() {
    setLoading(false);
    authStatus(true);
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
