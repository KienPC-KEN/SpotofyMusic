import React from "react";
import "../../styles/item/ItemSongInPlaylistStyle.scss";

interface InfoSongProps {
  image: string;
  name: string;
  author: string;
}
const ItemSongInPlaylist: React.FC<InfoSongProps> = ({
  image,
  name,
  author,
}) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <img
        src={require(`../../assets/images/${image}`)}
        alt=""
        width={52}
        height={52}
      />
      <div className="d-flex flex-column ms-sm-4">
        <span className="name-song">{name}</span>
        <span className="author-song">{author}</span>
      </div>
    </div>
  );
};

export default ItemSongInPlaylist;
