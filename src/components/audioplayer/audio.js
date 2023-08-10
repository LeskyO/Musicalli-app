import React, { useState, useRef, useEffect, useCallback } from "react";
import "./audio.css";
import Controls from "./controls";
import ProgressCircle from "./progresscircle";
import WaveAnimation from "./waveanimation";
import Songcard from "../songcard/songcard";

function Audioplayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioSrc = currentTrack?.preview_url || total[currentIndex]?.track?.preview_url;

  const handleNext = useCallback(() => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  }, [currentIndex, setCurrentIndex, total.length]);

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const audioRef = useRef(new Audio());

  const intervalRef = useRef(null);

  const { duration } = audioRef.current;

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }, [audioRef, handleNext]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    currentAudio.src = audioSrc;

    const onCanPlay = () => {
      if (isPlaying) {
        currentAudio.play();
        startTimer();
      }
    };

    currentAudio.addEventListener("canplay", onCanPlay);

    return () => {
      currentAudio.removeEventListener("canplay", onCanPlay);
    };
  }, [audioSrc, isPlaying, startTimer]);


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${addZero(secs)}`;
  };


  const artists = currentTrack?.album?.artists.map(artist => artist.name).join(" | ") || "";

  return (
    <div className="player-body flex">
      <div className="player-left-body">
      <Songcard album={currentTrack?.album} />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">{formatDuration(trackProgress)}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">{formatDuration(duration)}</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default Audioplayer;
