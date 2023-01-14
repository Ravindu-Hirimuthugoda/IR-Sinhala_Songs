"use strict";
const prettifiedData = require("../data/output.json");
var fs = require("fs");

var singer_names = [];
var lyricist_names = [];
var composer_names = [];
var genre_names = [];
var songTitle_names = [];

function collect_named_entities() {
  prettifiedData.forEach((song) => {
    var singer = song.singer;
    if (singer !== "Unknown") {
        var splits = singer.trim().split(" ");
        splits.forEach((split) => {
          if (!singer_names.includes(split.trim())) {
            singer_names.push(split.trim());
          }
        });
    }

    var lyricist = song.lyricist;
    if (lyricist !== "Unknown") {
        var splits = lyricist.trim().split(" ");
        splits.forEach((split) => {
          if (!lyricist_names.includes(split.trim())) {
            lyricist_names.push(split.trim());
          }
        });
    }

    var composer = song.composer;
    if (composer !== "Unknown") {
        var splits = composer.trim().split(" ");
        splits.forEach((split) => {
          if (!composer_names.includes(split.trim())) {
            composer_names.push(split.trim());
          }
      });
    }
    
    var genres = song.genre;
    if (Array.isArray(genres)) {
      genres.forEach((genre) => {
        var splits = genre.trim().split(" ");
        splits.forEach((split) => {
          if (!genre_names.includes(split.trim())) {
            genre_names.push(split.trim());
          }
        });
      });
    }else{
        var splits = genres.trim().split(" ");
        splits.forEach((split) => {
          if (!genre_names.includes(split.trim())) {
            genre_names.push(split.trim());
          }
        });
    }

    if (song.songTitle) {
      var splits = song.songTitle.trim().split(" ");
      splits.forEach((split) => {
        if (!songTitle_names.includes(split.trim())) {
          songTitle_names.push(split.trim());
        }
      });
    }
  });

  var entities = {
    singer_names,
    lyricist_names,
    composer_names,
    genre_names,
    songTitle_names,
  };
  var jsonentities = JSON.stringify(entities);
  var fs = require("fs");
  fs.writeFile("../data/named_entities.json", jsonentities, "utf8", (error) => {
    console.log(error);
  });
}

collect_named_entities();
