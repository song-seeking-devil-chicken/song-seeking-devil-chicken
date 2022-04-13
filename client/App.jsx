import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(props) {
  const [loggedIn, setLoginStatus] = useState(props.auth());

  const loggedInLinks = (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/songsearch">Song Search</Link>
      <Link to="/playlists">Playlists</Link>
      <a href="#" onClick={() => setLoginStatus(false)}>Sign Out</a>
    </>
  );

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
              marginRight: 'auto',
            }}
          />
          { (loggedIn) ? loggedInLinks : <a href="#" onClick={() => setLoginStatus(true)}>Sign In</a> }
        </div>
      </div>
      <Outlet context={setLoginStatus} />
    </div>
  );

  return element;
}
