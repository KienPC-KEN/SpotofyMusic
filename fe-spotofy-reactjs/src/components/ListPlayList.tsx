import React from "react";
import { Container } from "react-bootstrap";
import "../styles/ListPlayListStyle.scss";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import ItemPlayList2 from "./item/ItemPlayList2";

interface PlaylistProps {
  title: string;
  data: Array<PlaylistWithSongs>;
  index: number;
}

const ListPlayList: React.FC<PlaylistProps> = ({ title, data, index }) => {
  return (
    <Container fluid className="mt-5">
      <div className="d-flex flex-row justify-content-between">
        <h3>{title}</h3>
        <p className="text-content">SEE ALL</p>
      </div>
      {data &&
        data.length > 0 &&
        data
          .filter((item) => item.playlist.check_playlist.includes(index + 1))
          .slice(0,5)
          .map((item) => (
            <ItemPlayList2
              key={item.playlist.id}
              id={item.playlist.id}
              img={item.playlist.image}
              name={item.playlist.name}
              listSong={item.songs}
            />
          ))}
    </Container>
  );
};

export default ListPlayList;
