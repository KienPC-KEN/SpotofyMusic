import React, { useEffect, useState } from "react";
import "../styles/PlaylistSongStyle.scss";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import { useParams } from "react-router-dom";
import icPausePlaylist from "../assets/images/ic_pause_playlist.png";
import icPlayPlaylist from "../assets/images/ic_play_playlist.png";
import icFavourite from "../assets/images/ic_favorite_playlist.png";
import icDownload from "../assets/images/ic_download.png";
import icOption from "../assets/images/ic_option.png";
import TableListSong from "../components/TableListSong";
import icDuration from "../assets/images/ic_duration.png";

import {
  setCurrentSong,
  setPlaylist,
  pauseSong,
  playSong,
} from "../redux/actions/MusicAction";
import { setBackgroundHeader } from "../redux/actions/HeaderAction";
import { useDispatch, useSelector } from "react-redux";
import ModalCheckLogin from "../components/modal/ModalCheckLogin";

interface ListSongInPlaylistProps {
  data: Array<PlaylistWithSongs>;
}
const Playlist: React.FC<ListSongInPlaylistProps> = ({ data }) => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authData.isLogin);
  const { songs, currentSong, isPlaying } = useSelector(
    (state: any) => state.musicData
  );

  const id = paramId ? parseInt(paramId, 10) : null;
  const [dataPlaylist, setDataPlaylist] = useState<PlaylistWithSongs>();
  const [authors, setAuthors] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStringAuthor();
  });

  const checkLogin = (data: any, item: any) => {
    if (isLogin) {
      dispatch(setCurrentSong(data, item));
    } else {
      setShowModal(true);
    }
  };

  const handlePlaySongRandomClick = () => {
    if (songs) {
      const uniqueSongs = songs.filter((song: any) => song !== currentSong);

      const randomIndex = Math.floor(Math.random() * uniqueSongs.length);

      const randomSong = uniqueSongs[randomIndex];

      checkLogin(dataPlaylist!!, randomSong);
    }
  };
  const handlePlayPauseClick = () => {
    if (currentSong.url !== "") {
      if (!isPlaying) {
        dispatch(playSong());
      } else {
        dispatch(pauseSong());
      }
    } else {
      if (!isPlaying) {
        if (songs?.length > 0) {
          handlePlaySongRandomClick();
        }
      } else {
        dispatch(pauseSong());
      }
    }
  };

  const getStringAuthor = () => {
    if (dataPlaylist != null) {
      let authorString = dataPlaylist.songs.map((song) => {
        const authorNames = song.author.split(",");
        return authorNames;
      });
      const flattenedAuthors = authorString.flat();

      const topAuthors = flattenedAuthors.slice(0, 5);

      const authorText = topAuthors.join(", ");

      const finalAuthorString =
        authorText.length > 5 ? `${authorText} and more` : authorText;

      setAuthors(finalAuthorString.trim());
    }
  };
  useEffect(() => {
    if (id === null) {
      console.error("Invalid ID");
      return;
    }
    const foundPlaylist = data.find((item) => item.playlist.id === id);
    if (foundPlaylist) {
      dispatch(setPlaylist(foundPlaylist));
      dispatch(setBackgroundHeader(foundPlaylist.playlist.color));

      return setDataPlaylist(foundPlaylist);
    }
  }, [data, dispatch, id]);

  return (
    <div
      style={{
        background: `linear-gradient(
        to bottom,
        #${dataPlaylist?.playlist.color} 0%,
        #${dataPlaylist?.playlist.color} 10%,
        #2c2c2c,
        #2c2c2c 100%
      )`,
      }}
    >
      {dataPlaylist && (
        <div className="container-playlist d-flex flex-row mt-sm-3 ms-sm-5 align-items-center">
          <img
            src={require(`../assets/images/${dataPlaylist.playlist.image}`)}
            alt="Lỗi ảnh"
            width={200}
            height={200}
          />
          <div className="flex-column ms-sm-5">
            <h1 className="name-playlist ">{dataPlaylist.playlist.name}</h1>
            <p className="author-playlist">{authors}</p>
          </div>
        </div>
      )}
      <div className="list-song mt-sm-5">
        <div className="flex-row ms-sm-4 pt-sm-3">
          <img
            src={isPlaying ? icPausePlaylist : icPlayPlaylist}
            alt=""
            onClick={() => handlePlayPauseClick()}
          />
          <img src={icFavourite} alt="" className="ms-sm-5" />
          <img src={icDownload} alt="" className="ms-sm-4" />
          <img src={icOption} alt="" className="ms-sm-4" />
        </div>
        <table className="table-transparent grid ms-sm-5">
          <thead>
            <tr>
              <th className="g-col-1">#</th>
              <th className="g-col-3">TITLE</th>
              <th className="g-col-2">ALBUM</th>
              <th className="g-col-2">DATE ADDED</th>
              <th className="g-col-1">
                <img src={icDuration} alt="" />
              </th>
            </tr>
          </thead>
          <tr className="table-separator border-top border-secondary">
            <th colSpan={5} className="pb-sm-3"></th>
          </tr>
          <TableListSong data={dataPlaylist} />
        </table>
      </div>
      {dataPlaylist && (
        <ModalCheckLogin
          showModal={showModal}
          setShowModal={setShowModal}
          image={dataPlaylist.playlist.image}
        />
      )}
      <div style={{ marginTop: 150 }}></div>
    </div>
  );
};

export default Playlist;
