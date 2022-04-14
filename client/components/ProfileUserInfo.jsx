import React, { useState, useEffect } from 'react';

const profileObj = {
  displayName: '',
  profilePicURL: '',
  spotifyURL: '',
};

export default function ProfileUserInfo() {
  const [isLoaded, setLoadState] = useState(false);

  async function getData() {
    return fetch('/api/call/me').then((res) => res.json()).then((res) => {
      return res;
    })
  }
  
  useEffect(() => {
    if (!isLoaded) {
      getData().then((res) => {
        console.log(res);
        profileObj.displayName = res.body.display_name;
        profileObj.profilePicURL = res.body.images[0].url;
        profileObj.spotifyURL = res.body.external_urls.spotify;
        setLoadState(true);
      });
    }
  });

  if (!isLoaded) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <div className="profileUserInfo">
        <h1>{profileObj.displayName}</h1>
        <img src={profileObj.profilePicURL} alt="Profile pic" />
        <a href={profileObj.spotifyURL}><h3>Spotify Profile Page</h3></a>
      </div>
    );
  }
}
