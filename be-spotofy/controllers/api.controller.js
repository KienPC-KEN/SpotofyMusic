const playlist = require("../model/playlist.model");
const song = require("../model/song.model");

exports.getData = async (req, res) => {
  try {
    const listPlaylist = await playlist.find({});
    const listSong = await song.find();

    const dataJson = listPlaylist.map((itemPlaylist) => {
      const songInPlaylist = listSong.filter((itemSong) =>
        itemSong.idPlaylist.includes(itemPlaylist.id)
      );

      return {
        playlist: itemPlaylist,
        songs: songInPlaylist,
      };
    });

    if (dataJson.length > 0) {
      return res.status(200).json({ data: dataJson, check: "có dữ liệu" });
    } else {
      return res.status(404).json({ check: "không có dữ liệu" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
