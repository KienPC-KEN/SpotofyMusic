import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import NavTab from "../views/navigation/NavTab";
import MusicPlayerBar from "../components/MusicPlayerBar";
import PlaylistSong from "../views/PlaylistSong";
import Search from "../views/Search";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import { User } from "../model/User";
import HeaderPage from "../components/HeaderPage";

interface DataProps {
  playlistWithSong: Array<PlaylistWithSongs>;
  currentSong: any;
  userLogin: User;
  backgroundColor: string;
}

const route: React.FC<DataProps> = ({
  playlistWithSong,
  currentSong,
  userLogin,
  backgroundColor,
}) => {
  return (
    <Router>
      <div
        className="d-flex flex-row"
        style={{ display: "flex", height: "100vh" }}
      >
        <NavTab />

        <div
          className="d-flex flex-column col"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <HeaderPage user={userLogin} backgroundColor={backgroundColor} />
          <Routes>
            <Route
              path="/"
              element={<Home playlistWithSong={playlistWithSong} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/play-list/:id"
              element={<PlaylistSong data={playlistWithSong} />}
            />
            <Route
              path="/search"
              element={<Search data={playlistWithSong} />}
            />
          </Routes>
        </div>
      </div>
      {currentSong.url !== "" ? (
        <div className="music-player-bar">
          <MusicPlayerBar />
        </div>
      ) : null}
    </Router>
  );
};

export default route;
