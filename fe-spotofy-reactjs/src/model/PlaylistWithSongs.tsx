import { Playlist } from "./Playlist";
import { Song } from "./Song";
export interface PlaylistWithSongs {
  playlist: Playlist;
  songs: Array<Song>;
}
