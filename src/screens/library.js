import React, { useEffect, useState } from 'react';
import APIKit from '../spotify';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import './library.css';
import { useNavigate } from 'react-router-dom';

function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get playlists data
    APIKit.get('me/playlists').then(function (response) {
      setPlaylists(response.data.items);
    });

    // Get albums data
    APIKit.get('me/albums').then(function (response) {
      setAlbums(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/musicplayer', { state: { id: id } });
  };

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.name &&
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = albums.filter(
    (album) =>
      album.name &&
      album.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const combinedResults = [...filteredPlaylists, ...filteredAlbums];

  return (
    <div className="screen-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search playlists and albums..."
        />
      </div>
      <div className="library-body">
  {combinedResults.map((item) => (
    <div
      className="playlist-card"
      key={item.id}
      onClick={() => playPlaylist(item.id)}
    >
      {item.images && item.images[0]?.url && (
        <img
          src={item.images[0]?.url}
          className="playlist-image"
          alt="Playlist/Album-Art"
        />
      )}
      <p className="playlist-title">{item.name}</p>
      {item.tracks && (
        <p className="playlist-subtitle">{item.tracks.total} Songs</p>
      )}
      <div className="playlist-fade">
        <IconContext.Provider value={{ size: '50px', color: '#E99D72' }}>
          <AiFillPlayCircle />
        </IconContext.Provider>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Library;
