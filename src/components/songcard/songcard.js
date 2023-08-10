import React from 'react';
import AlbumImage from './albumimage';
import AlbumInfo from './albuminfo';
import "./songcard.css"

function Songcard({ album }) {
    return (
      <div className="songCard-body flex">
        <AlbumImage url={album?.images[0]?.url} />
        <AlbumInfo album={album} />
      </div>
    );
  }
export default Songcard