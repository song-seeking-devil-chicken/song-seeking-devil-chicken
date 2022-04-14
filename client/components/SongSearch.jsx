import React, { useState } from 'react';
import Track from './Track';
import { useOutletContext } from 'react-router-dom';

export default function SongSearch() {
  const [results, updateResults] = useState([]);
  const [playerID, token] = useOutletContext();

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
          id: ele.id,
          uri: ele.uri,
        }
        console.log(song);
        searchResults.push(song);
      })
      if (searchResults.length !== 0) updateResults(searchResults)
      else updateResults([]);
    })
  }

  
  const tracks = [];

  for (let i = 0; i < results.length; i++) {
    const getAdvanced = () => {
      const id = results[i].id;
      fetch('/api/call/audioFeatures?' + id).then((res) => res.json()).then((res) => {
        console.log(res);
      })
    }

    const playSong = () => {
      const data = {
        context_uri: results[i].uri,
        device_id: playerID
      }
      console.log(data.context_uri);
      console.log(data);
      fetch('/api/call/playsong', {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      });
    }

    tracks.push(
      <Track key={`trackID${i}`} data={results[i]} playSong={playSong} getAdvanced={getAdvanced} />
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
