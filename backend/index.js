var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var searchRoutes = require("./routes/search");
var allSongsRoutes = require("./routes/allSongs");
var allGenresRoutes = require("./routes/filters");
var genreFilterRoutes = require("./routes/genreFilter");
var singerFilterRoutes = require("./routes/singerFilter");
var composerFilterRoutes = require("./routes/composerFilter");
var lyricistFilterRoutes = require("./routes/lyricistFilter");

var app = express();
var port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/search", searchRoutes);
app.use("/all", allSongsRoutes);
app.use("/filters", allGenresRoutes);
app.use("/genre", genreFilterRoutes);
app.use("/singer", singerFilterRoutes);
app.use("/composer", composerFilterRoutes);
app.use("/lyricist", lyricistFilterRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
