import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  const element = (
    <div className="mainPage">
      <div className="navBarContainer">
        <div className="navBar">
          <img
            src="img/DevilChickenWithHeadphones.jpg"
            alt="Song Seeking Devil Chicken"
            style={{
              borderRadius: '100%',
              border: 'solid',
              borderColor: '#0e8a3d',
              borderWidth: '3px',
              height: '4em',
              width: '4em',
            }}
          />
          <Link to={{ pathname: '/api/login' }}>Log in</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/songsearch">Song Search</Link>
          <Link to="/playlists">Playlists</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );

  return element;
}
