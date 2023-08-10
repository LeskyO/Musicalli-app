import React, { useEffect, useState } from "react";
import "./musicplayer.css";
import { useLocation } from "react-router-dom";
import apiClient from '../spotify';
import Queue from '../components/queue/queue';
import Audio from '../components/audioplayer/audio';



function Musicplayer() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track || {});
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
      
          <Audio
            currentTrack={currentTrack}
            total={tracks}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          
          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
          
      </div>
      <div className="right-player-body">
        
       
      
      </div>
    </div>
  );
}

export default Musicplayer;
