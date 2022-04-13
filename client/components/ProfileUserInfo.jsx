import React from 'react';

export default function ProfileUserInfo() {
  const profileObj = {
    displayName: 'Anthony',
    profilePicURL: 'https://i.scdn.co/image/ab6775700000ee85ee9a5493d5ceb1e9d897d009',
    spotifyURL: 'https://open.spotify.com/user/9pwfjazzagu2srmh8d5mnd0ar',
  };

  return (
    <div className="profileUserInfo">
      <h1>{profileObj.displayName}</h1>
      <img src={profileObj.profilePicURL} alt="Profile pic" />
      <a href={profileObj.spotifyURL}><h3>Spotify Profile Page</h3></a>
    </div>
  );
}
