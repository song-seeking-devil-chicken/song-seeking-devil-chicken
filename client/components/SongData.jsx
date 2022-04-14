import React, { useState } from 'react';

export default function SongData(props) {
  console.log(props.data);
  
  if (!props.data) {
    return (
      <div className="songData">
        Loading...
      </div>
    );
  }

  return (
    <div className="songData">
      <span>Tempo (BPM):</span>
      <span>{props.data.tempo}</span>
      <span>Acousticness:</span>
      <span>{props.data.acousticness}</span>
      <span>Danceability:</span>
      <span>{props.data.danceability}</span>
      <span>Energy:</span>
      <span>{props.data.energy}</span>
      <span>Key:</span>
      <span>{props.data.key}</span>
      <span>Liveness:</span>
      <span>{props.data.liveness}</span>
      <span>Time Signature:</span>
      <span>{props.data.time_signature}/4</span>
      <span>Valence:</span>
      <span>{props.data.valence}</span>
      <span>Speechiness:</span>
      <span>{props.data.speechiness}</span>
    </div>
  );
}
