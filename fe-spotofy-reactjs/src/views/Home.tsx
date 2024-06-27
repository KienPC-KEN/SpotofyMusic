import React, { useEffect } from "react";
import "../styles/HomeStyle.scss";
import { Container } from "react-bootstrap";
import ItemPlayList1 from "../components/item/ItemPlayList1";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import ListPlayList from "../components/ListPlayList";
import { setBackgroundHeader } from "../redux/actions/HeaderAction";
import { useDispatch } from "react-redux";
interface DataProps {
  playlistWithSong: Array<PlaylistWithSongs>;
}
const Home: React.FC<DataProps> = ({ playlistWithSong }) => {
  const dispatch = useDispatch();
  let titlePlaylist = [
    "Your top mixes",
    "Made for you",
    "Recently played",
    "Recently played",
    "Uniquely yours",
  ];

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning !";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon !";
    } else {
      return "Good evening !";
    }
  };
  useEffect(() => {
    dispatch(setBackgroundHeader("2c2c2c"));
  }, [dispatch]);

  return (
    <Container fluid>
      <div>
        <h3 className="mt-sm-3 ms-sm-5">{getGreetingMessage()}</h3>
      </div>
      <div className="mt-sm-4">
        {playlistWithSong &&
          playlistWithSong.length > 0 &&
          playlistWithSong
            .filter((item) => item.playlist.check_playlist.includes(0))
            .map((item) => (
              <ItemPlayList1
                key={item.playlist.id}
                id={item.playlist.id}
                name={item.playlist.name}
                img={item.playlist.image}
              />
            ))}
      </div>
      {titlePlaylist.map((title, index) => (
        <ListPlayList
          key={index}
          title={title}
          data={playlistWithSong}
          index={index}
        />
      ))}
      <div style={{ marginTop: 100 }}></div>
    </Container>
  );
};

export default Home;
