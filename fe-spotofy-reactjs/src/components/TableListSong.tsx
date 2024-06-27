import React, { useState } from "react";
import "../styles/TableListSongStyle.scss";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import ItemSongInPlaylist from "./item/ItemSongInPlaylist";
import { setCurrentSong } from "../redux/actions/MusicAction";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils";
import ModalCheckLogin from "./modal/ModalCheckLogin";

interface DataListSongProps {
  data?: PlaylistWithSongs;
}

const TableListSong: React.FC<DataListSongProps> = ({ data }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authData.isLogin);
  const [showModal, setShowModal] = useState(false);
  const [imageSong, setImageSong] = useState("");

  const handleShow = () => setShowModal(true);
  const checkLogin = (data: any, item: any) => {
    if (isLogin) {
      dispatch(setCurrentSong(data, item));
    } else {
      handleShow();
      setImageSong(item.image);
    }
  };

  return (
    <tbody>
      {data &&
        data.songs.length > 0 &&
        data.songs.map((item, index) => (
          <>
            <tr
              key={item.id}
              onClick={() => {
                checkLogin(data, item);
              }}
            >
              <td>{index + 1}</td>
              <td>
                <ItemSongInPlaylist
                  image={item.image}
                  name={item.name}
                  author={item.author}
                />
              </td>
              <td>{data.playlist.name}</td>
              <td></td>
              <td>{formatTime(item.duration)}</td>
            </tr>
            {imageSong ? (
              <ModalCheckLogin
                showModal={showModal}
                setShowModal={setShowModal}
                image={imageSong}
              />
            ) : null}
          </>
        ))}
    </tbody>
  );
};

export default TableListSong;
