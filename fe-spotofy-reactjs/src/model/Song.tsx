export interface Song {
  id: number;
  name: string;
  image: string;
  author: string;
  idPlaylist: Array<number>;
  url: string;
  duration: number;
}
