import React, { useState, useEffect } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

export default function Player(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    if (props.accessToken && !player) {
      console.log('ping');
      const script = document.createElement('script');

      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
    
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Song Seeking Devil Chicken',
          getOAuthToken: cb => { cb(props.accessToken) },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          props.setPlayerID(device_id);
        })

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        })

        player.addListener('player_state_changed', ( state => {

          if (!state) {
              return;
          }

          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then( state => { 
              (!state)? setActive(false) : setActive(true) 
          });

        }));

        player.connect();
      }
    }
    
  })

  return (
    <div className="spotifyPlayer">
      <div className="spotifyWrapper">
        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" onLoad={(event) => event.target.style.display = 'inline-block'} />
        <div className="now-playing__side">
          <div className="now-playing__name">{current_track.name}</div>
          <div className="now-playing__artist">{current_track.artists[0].name}</div>
        </div>
        <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
          <SkipPreviousRoundedIcon />
        </button>
        <button className="btn-spotify" onClick={() => { player.togglePlay() }} >{ is_paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon /> }</button>
        <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
          <SkipNextRoundedIcon />
        </button>
      </div>
    </div>
  );
}
