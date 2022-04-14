import React from 'react';

export default function Track(props) {
  return (
    <div className="track">
      <img style={{height: '6em', width: '6em'}} src={props.data.albumImg} alt="album cover" />
      <div className="trackData">
        <h3>{props.data.name}</h3>
        <h4>{props.data.artists}</h4>
        <h4>{props.data.album}</h4>
      </div>
    </div>
  );
}