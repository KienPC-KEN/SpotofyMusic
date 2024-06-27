import {
  CURRENT_SONG,
  PLAYLIST,
  NEXT_SONG,
  PREV_SONG,
  PAUSE,
  PLAY,
  RANDOM,
  REPEAT,
} from "../actions/MusicAction";

const initialState = {
  playlist: {
    id: 0,
    name: "",
    color: "",
    image: "",
    check_playlist: [],
  },
  songs: [],

  currentSong: {
    id: 0,
    name: "",
    image: "",
    author: "",
    idPlaylist: [],
    url: "",
    duration: 0,
  },

  isPlaying: false,

  isRandom: false,
  isRepeat: false,
};

const musicReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  console.log(state);

  switch (action.type) {
    case CURRENT_SONG:
      const { playlist, currentSong } = action.payload;

      return {
        ...state,
        isPlaying: true,
        playlist: playlist.playlist,
        songs: playlist.songs,
        currentSong: currentSong,
      };

    case PLAYLIST:
      return {
        ...state,
        songs: action.payload,
      };

    case NEXT_SONG:
      return {
        ...state,
        isPlaying: true,
        currentSong: action.payload,
      };
    case PREV_SONG:
      return {
        ...state,
        isPlaying: true,
        currentSong: action.payload,
      };

    case PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case RANDOM:
      return {
        ...state,
        isRandom: action.payload,
      };
    case REPEAT:
      return {
        ...state,
        isRepeat: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
