import http from "./http-common";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import { User } from "../model/User";

const getData = async () => {
  return await http.get<Array<PlaylistWithSongs>>("/get-data");
};

const register = async (data: User) => {
  return await http.post("/auth/register", data);
};

const login = async (email: string, password: string) => {
  return await http.post("/auth/login", { email, password });
};

const PlaylistService = {
  getData,
  register,
  login,
};
export default PlaylistService;
