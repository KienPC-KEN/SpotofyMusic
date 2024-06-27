import React, { useEffect, useRef, useState } from "react";
import "../styles/MusicPlayerBarStyle.scss";
import icFavourite from "../assets/images/ic_favourite.png";
import icUnFavourite from "../assets/images/ic_unfavourite.png";
import icNextHover from "../assets/images/ic_next_hover.png";
import icPause from "../assets/images/ic_pause.png";
import icPlay from "../assets/images/ic_play.png";
import icPrevHover from "../assets/images/ic_prev_hover.png";
import icRepeat from "../assets/images/ic_repeat.png";
import icShuffle from "../assets/images/ic_shuffle.png";
import icNext from "../assets/images/ic_next.png";
import icPauseHover from "../assets/images/ic_pause_hover.png";
import icPlayHover from "../assets/images/ic_play_hover.png";
import icPrev from "../assets/images/ic_prev.png";
import { useSelector, useDispatch } from "react-redux";
import {
  nextSong,
  prevSong,
  playSong,
  pauseSong,
  randomSong,
  repeatSong,
} from "../redux/actions/MusicAction";
import { formatTime } from "../utils";

const MusicPlayerBar = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { playlist, songs, currentSong, isPlaying, isRandom, isRepeat } =
    useSelector((state: any) => state.musicData);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    if (currentSong?.url) {
      const audioSrc = require(`../assets/audio/${currentSong.url}`);
      audio.src = audioSrc;
    }

    // Sự kiện timeupdate để cập nhật thời gian  hiện tại
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Sự kiện loadedmetadata để lấy tổng thời gian bài hát
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onCanPlay = () => {
      audio.play();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [currentSong.url]);

  const handleNextSongClick = () => {
    if (songs) {
      const currentIndex = songs.findIndex(
        (song: any) => song.id === currentSong.id
      );

      const nextIndex = (currentIndex + 1) % songs.length;

      const randomNextSong = songs[nextIndex];

      dispatch(nextSong(randomNextSong));
    }
  };

  const handlePrevSongClick = () => {
    if (songs) {
      const currentIndex = songs.findIndex(
        (song: any) => song.id === currentSong.id
      );

      let prevIndex;
      if (currentIndex > 0) {
        prevIndex = currentIndex - 1;
      } else {
        prevIndex = songs.length - 1;
      }

      const songIndex = songs[prevIndex];
      console.log(songIndex);

      dispatch(prevSong(songIndex));
    }
  };

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(pauseSong());
    } else {
      audioRef.current.play();
      dispatch(playSong());
    }
  };

  const handleRandomSong = () => {
    if (isRandom) {
      dispatch(randomSong(false));
    } else {
      dispatch(randomSong(true));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        const currentIndex = songs.findIndex(
          (song: any) => song.id === currentSong.id
        );

        const nextIndex = isRandom
          ? Math.floor(Math.random() * songs.length)
          : (currentIndex + 1) % songs.length;

        const randomNextSong = songs[nextIndex];

        dispatch(nextSong(randomNextSong));
      }
    };

    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSong.id, dispatch, isRandom, isRepeat, songs]);

  const handleRepeatSong = () => {
    if (isRepeat) {
      dispatch(repeatSong(false));
    } else {
      dispatch(repeatSong(true));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="d-flex flex-row align-items-center">
      {currentSong.image !== "" ? (
        <img
          src={require(`../assets/images/${currentSong.image}`)}
          alt="Lỗi ảnh"
          width={72}
          height={72}
        />
      ) : null}
      {currentSong.name !== "" && currentSong.author !== "" ? (
        <div className="d-flex flex-column ms-sm-4">
          <span className="name-music">{currentSong.name}</span>
          <span className="author-music mt-sm-1">{currentSong.author}</span>
        </div>
      ) : null}

      <img
        src={isFavourite ? icFavourite : icUnFavourite}
        onClick={() => handleFavouriteClick()}
        alt="Lỗi ảnh"
        className="ms-sm-4"
      />
      <div className="music-status d-flex flex-column flex-fill justify-content-center align-items-center">
        <div>
          <img
            src={icShuffle}
            alt="Lỗi ảnh"
            onClick={() => handleRandomSong()}
          />
          {isRandom ? <span>.</span> : null}

          <img
            src={isHovered === 1 ? icPrevHover : icPrev}
            alt="Lỗi ảnh"
            onClick={() => handlePrevSongClick()}
            className="ms-sm-4"
            onMouseEnter={() => setIsHovered(1)}
            onMouseLeave={() => setIsHovered(0)}
          />
          <img
            src={
              isPlaying
                ? icPause && isHovered === 2
                  ? icPauseHover
                  : icPause
                : icPlay && isHovered === 2
                ? icPlayHover
                : icPlay
            }
            onClick={() => handlePlayPauseClick()}
            alt="Lỗi ảnh"
            className={"ms-sm-4"}
            onMouseEnter={() => setIsHovered(2)}
            onMouseLeave={() => setIsHovered(0)}
          />
          <img
            src={isHovered === 3 ? icNextHover : icNext}
            alt="Lỗi ảnh"
            className="ms-sm-4"
            onClick={() => handleNextSongClick()}
            onMouseEnter={() => setIsHovered(3)}
            onMouseLeave={() => setIsHovered(0)}
          />
          <img
            src={icRepeat}
            alt="Lỗi ảnh"
            className="ms-sm-4"
            onClick={() => handleRepeatSong()}
          />
          {isRepeat ? <span>.</span> : null}
        </div>
        <div className="slider-music d-flex flex-row ">
          <p className="time-slider me-sm-2">{formatTime(currentTime)}</p>
          <input
            className="slider"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => handleSliderChange(e)}
            style={{
              background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${progress}%, #808080 ${progress}%, #808080 100%)`,
            }}
          />
          <p className="time-slider ms-sm-2">{formatTime(duration)}</p>
        </div>
      </div>

      <div className="d-flex flex-column me-sm-5">
        <span className="name-music">Playing list</span>
        <span className="author-music mt-sm-1">{playlist.name}</span>
      </div>
    </div>
  );
};

export default MusicPlayerBar;
