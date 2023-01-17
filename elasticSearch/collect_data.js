"use strict";
const prettifiedData = require("../data/output.json");
var fs = require("fs");

var singer_names = [];
var lyricist_names = [];
var composer_names = [];
var genre_names = [];
var songTitle_names = [];
var singers = [];
var composers = [];
var genres_li = [];
var lyricists = [];

function collect_named_entities() {
  prettifiedData.forEach((song) => {
    var singer = song.singer;
    if (singer !== "Unknown") {
        singers.push(singer);
        var splits = singer.trim().split(" ");
        splits.forEach((split) => {
          if (!singer_names.includes(split.trim())) {
            singer_names.push(split.trim());
          }
        });
    }

    var lyricist = song.lyricist;
    if (lyricist !== "Unknown") {
        lyricists.push(lyricist);
        var splits = lyricist.trim().split(" ");
        splits.forEach((split) => {
          if (!lyricist_names.includes(split.trim())) {
            lyricist_names.push(split.trim());
          }
        });
    }

    var composer = song.composer;
    if (composer !== "Unknown") {
        composers.push(composer);
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
        genres_li.push(genre);
        var splits = genre.trim().split(" ");
        splits.forEach((split) => {
          if (!genre_names.includes(split.trim())) {
            genre_names.push(split.trim());
          }
        });
      });
    }else{
        var splits = genres.trim().split(" ");
        genres_li.push(genres);
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
    singers,
    lyricists,
    composers,
    genres_li,
  };
  var jsonentities = JSON.stringify(entities);
  var fs = require("fs");
  fs.writeFile("../data/named_entities.json", jsonentities, "utf8", (error) => {
    console.log(error);
  });
}

collect_named_entities();
