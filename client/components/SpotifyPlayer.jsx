import React from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

export default function Player() {
  return (
    <div className="spotifyPlayer">
      <button type="button">
        <SkipPreviousRoundedIcon />
      </button>
      {/* <button type="button" id="play">P</button> */}
      <button type="button">
        <PlayArrowRoundedIcon />
      </button>
      {/* <button type="button" id="next">N</button> */}
      <button type="button">
        <SkipNextRoundedIcon />
      </button>
    </div>
  );
}
