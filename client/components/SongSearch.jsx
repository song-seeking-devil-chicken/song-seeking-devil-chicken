import React, { useState } from 'react';
import Track from './Track';

export default function SongSearch() {
  const [results, updateResults] = useState([]);

  function search() {
    const queryParameters = {
      track: document.getElementById('searchTitle').value,
      artist: document.getElementById('searchArtist').value,
      album: document.getElementById('searchAlbum').value
    }

    const queryString = [];

    Object.keys(queryParameters).forEach((property) => {
      if (queryParameters[property] !== '') {
        queryString.push(property.concat(':'.concat(queryParameters[property])));
      }
    })
    const query = queryString.join(' ').replace(/ /g, '+');
    
    fetch('/api/call/search?query='.concat(query)).then((res) => res.json()).then((res) => {
      const searchResults = [];

      res.forEach((ele) => {
        const artistNames = [];

        ele.artists.forEach((artist) => {
          artistNames.push(artist.name);
        })

        const song = {
          name: ele.name,
          artists: artistNames.join(' '),
          album: ele.album.name,
          albumImg: ele.album.images[0].url,
        }

        searchResults.push(song);
      })
      if (searchResults.length !== 0) updateResults(searchResults)
      else updateResults([]);
    })
  }

  const tracks = [];

  for (let i = 0; i < results.length; i++) {
    tracks.push(
      <Track key={`trackID${i}`} data={results[i]} />
    )
  }


  return (
    <div className="searchResultContainer">
      <div className="songSearch">
        <div className="twoByTwo">
          <span>Title:</span>
          <input type="text" id="searchTitle" />
          <span>Artist:</span>
          <input type="text" id="searchArtist" />
          <span>Album:</span>
          <input type="text" id="searchAlbum" />
        </div>
        <button type="button" onClick={search}>&#x1F50D;</button>
      </div>
      {tracks}
    </div>
  );
}
