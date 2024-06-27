const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoute = require("./routes/api.route");
const loginRoute = require("./routes/auth.route");

const app = express();

const uri =
  "mongodb+srv://phungchikien196:ERhbIN6rfSvq4j3D@cluster0.zkirzke.mongodb.net/spotofy";
mongoose.connect(uri);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRoute);
app.use("/api/auth", loginRoute);
const port = 8080;

app.get("/", (req, res) => {
  return res.redirect("/api");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
