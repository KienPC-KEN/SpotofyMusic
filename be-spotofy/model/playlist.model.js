const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  check_playlist: { type: Array, required: true },
  color: { type: String, required: true },
});

const PlaylistModel = mongoose.model("playlist", PlaylistSchema);
module.exports = PlaylistModel;
