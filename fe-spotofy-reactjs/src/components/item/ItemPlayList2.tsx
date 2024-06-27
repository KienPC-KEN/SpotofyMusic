import React, { useEffect, useState } from "react";
import "../../styles/item/ItemPlaylist2Style.scss";
import { Song } from "../../model/Song";
import { NavLink } from "react-router-dom";
interface DataProps {
  id: number;
  img: string;
  name: string;
  listSong: Array<Song>;
}
const ItemPlayList2: React.FC<DataProps> = ({ id, img, name, listSong }) => {
  const [authors, setAuthors] = useState("");

  useEffect(() => {
    getStringAuthor();
  });

  const getStringAuthor = () => {
    let authorString = listSong.map((song) => {
      const authorNames = song.author.split(",");
      return authorNames;
    });
    const topAuthors = authorString.join(", ");

    setAuthors(topAuthors.trim());
  };
  return (
    <NavLink to={`/play-list/${id}`}>
      <div className="layout-item-2 d-inline-flex flex-column bg-white bg-opacity-25 ms-sm-5 mt-sm-3 rounded-3">
        <img
          className="image-item rounded-start-3"
          src={require(`../../assets/images/${img}`)}
          alt=""
          width={182}
          height={182}
        />
        <h5 className="text-name-item mx-sm-4">{name}</h5>

        <p className="text-author-item mx-sm-4">{authors}</p>
      </div>
    </NavLink>
  );
};

export default ItemPlayList2;
