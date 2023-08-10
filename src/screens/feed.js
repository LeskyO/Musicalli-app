import React, { useEffect, useState } from "react";
import "./feed.css";
import { useLocation } from "react-router-dom";
import apiClient from '../spotify';
import Widgets from "../components/widgets/widgets";

function CombinedFeed() {
  const location = useLocation();
  
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get("recommendations", { params: { limit: 10 } })
      .then(res => setRecommendations(res.data.tracks))
      .catch(err => console.error("Error getting For You recommendations:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.state) {
      setLoading(true);
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then(res => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        })
        .catch(err => {
          console.error(err);
          setError("Failed to fetch tracks. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  if (loading) return <div className="screen-container flex">Loading...</div>;
  if (error) return <div className="screen-container flex">{error}</div>;

  return (
    <div className="screen-container">
      {/* Rendering the widgets */}
      <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      
      {/* Rendering the tracks from the selected playlist */}
      <div className="playlist-tracks">
        <h2>Selected Playlist</h2>
        {tracks.map((track, index) => (
          <div key={index}>
            {track.track.name} - {track.track.artists[0]?.name}
          </div>
        ))}
      </div>
      
      {/* Rendering the "For You" recommendations */}
      <div className="recommendations">
        <h2>For You</h2>
        {recommendations.map((track, index) => (
          <div key={index}>
            {track.name} - {track.artists[0]?.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CombinedFeed;
