import React from 'react';
import "./albumimage.css";

function Albumimage({ url }) {
    return (
      <div className="albumImage flex">
        <img src={url} alt="album art" className="albumImage-art" />
        
      </div>
    );
  }

export default Albumimage