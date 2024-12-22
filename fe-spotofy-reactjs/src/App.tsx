import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { Container } from "react-bootstrap";

import { PlaylistWithSongs } from "./model/PlaylistWithSongs";
import PlaylistService from "./services/PlayListService";
import { useSelector } from "react-redux";
import Route from "./routes/route";
function App() {
  const [playlistWithSong, setPlaylistWithSong] = useState<
    Array<PlaylistWithSongs>
  >([]);
  const currentSong = useSelector((state: any) => state.musicData.currentSong);
  const userLogin = useSelector((state: any) => state.authData.user);
  const header = useSelector((state: any) => state.headerData);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await PlaylistService.getData()
      .then((res: any) => {
        setPlaylistWithSong(res.data.data);
      })
      .catch((e: string) => {
        setError(e);
      });
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <Container fluid className="p-0">
      <div className="App-header ">
        {
          <Route
            playlistWithSong={playlistWithSong}
            currentSong={currentSong}
            userLogin={userLogin}
            backgroundColor={header.backgroundColor}
          />
        }
      </div>
    </Container>
  );
}

export default App;
