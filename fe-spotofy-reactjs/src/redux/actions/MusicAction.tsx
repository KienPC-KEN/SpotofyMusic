import { PlaylistWithSongs } from "../../model/PlaylistWithSongs";
import { Song } from "../../model/Song";

export const CURRENT_SONG = "CURRENT_SONG";
export const NEXT_SONG = "NEXT_SONG";
export const PREV_SONG = "PREV_SONG";
export const PLAYLIST = "PLAYLIST";
export const PAUSE = "PAUSE";
export const PLAY = "PLAY";
export const RANDOM = "RANDOM";
export const REPEAT = "REPEAT";

export const setCurrentSong = (
  playlist: PlaylistWithSongs,
  currentSong: Song
) => ({
  type: CURRENT_SONG,
  payload: { playlist, currentSong },
});

export const setPlaylist = (playlist: PlaylistWithSongs) => ({
  type: PLAYLIST,
  payload: playlist.songs,
});

export const nextSong = (nextSong: Song) => ({
  type: NEXT_SONG,
  payload: nextSong,
});

export const prevSong = (prevSong: Song) => ({
  type: PREV_SONG,
  payload: prevSong,
});

export const pauseSong = () => ({
  type: PAUSE,
});

export const playSong = () => ({
  type: PLAY,
});

export const randomSong = (isRandom: boolean) => ({
  type: RANDOM,
  payload: isRandom,
});

export const repeatSong = (isRepeat: boolean) => ({
  type: REPEAT,
  payload: isRepeat,
});
