const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  idPlaylist: { type: Array, required: true },
  url: { type: String, required: true },
  duration: { type: Number, required: true },
});

const SongModel = mongoose.model("song", SongSchema);
module.exports = SongModel;
