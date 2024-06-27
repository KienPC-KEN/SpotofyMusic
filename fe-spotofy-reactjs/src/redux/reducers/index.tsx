import { combineReducers } from "redux";
import musicReducer from "./MusicReducer";
import authReducer from "./AuthReducer";
import headerReducer from "./HeaderReducer";

const rootReducer = combineReducers({
  musicData: musicReducer,
  authData: authReducer,
  headerData: headerReducer,
});

export default rootReducer;
