"use strict";

const express = require("express");
const router = express.Router();

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

var keywords = require("../../data/keyword.json");
var named_entities = require("../../data/named_entities.json");

router.post("/", async function (req, res) {
  var query = req.body.query;
  var query_words = query.trim().split(" ");
  var removing_query_words = [];

  var size = 100;

  var field_type = "";

  var final_singer = 1;
  var final_lyrics = 1;
  var final_songTitle = 1;
  var final_lyricist = 1;
  var final_genre = 1;
  var final_composer = 1;
  var sorting = 0;
  var range = 0;
  var sort_method = [];

  if (query_words.length > 8) {
    final_lyrics = final_lyrics + 2;
    field_type = "best_fields";
  } else {
    field_type = "cross_fields";
    query_words.forEach((word) => {
      word = word.replace("ගේ", "");
      word = word.replace("යන්ගේ", "");
      if (named_entities.singer_names.includes(word)) {
        final_singer = final_singer + 1;
      }
      if (named_entities.lyricist_names.includes(word)) {
        final_lyricist = final_lyricist + 1;
      }
      if (named_entities.composer_names.includes(word)) {
        final_composer = final_composer + 1;
      }
      if (named_entities.genre_names.includes(word)) {
        final_genre = final_genre + 1;
      }
      if (named_entities.songTitle_names.includes(word)) {
        final_songTitle = final_songTitle + 1;
      }
      

      if (keywords.singer.includes(word)) {
        final_singer = final_singer + 1;
        removing_query_words.push(word);
      }
      if (keywords.composer.includes(word)) {
        final_composer = final_composer + 1;
        removing_query_words.push(word);
      }
      if (keywords.genre.includes(word)) {
        final_genre = final_genre + 1;
        removing_query_words.push(word);
      }
      if (keywords.lyricist.includes(word)) {
        final_lyricist = final_lyricist + 1;
        removing_query_words.push(word);
      }
      
      if (keywords.song.includes(word)) {
        removing_query_words.push(word);
      }

      if (keywords.sorting.includes(word)) {
        sorting = sorting + 1;
        removing_query_words.push(word);
      }

      if (!isNaN(word)) {
        range = parseInt(word);
        removing_query_words.push(word);
      }
    });
  }

//   console.log(final_singer);
//   console.log(final_lyricist);
//   console.log(final_composer);
//   console.log(final_genre);
//   console.log(final_songTitle);
//   console.log(final_lyrics);

  if (range == 0 && sorting > 0) {
    size = 10;
    sort_method = [{ viewCount: { order: "desc" } }];
  } else if (range > 0 || sorting > 0) {
    size = range;
    sort_method = [{ viewCount: { order: "desc" } }];
  }

  removing_query_words.forEach((word) => {
    query = query.replace(word, "");
  });

  var result = await client.search({
    index: "sinhala_songs_index",
    body: {
      size: size,
      _source: {
        includes: [
          "singer",
          "songTitle",
          "lyricist",
          "composer",
          "genre",
          "lyrics",
          "metaphors",
          "meaning",
        ],
      },
      sort: sort_method,
      query: {
        multi_match: {
          query: query.trim(),
          fields: [
            `singer^${final_singer}`,
            `songTitle^${final_songTitle}`,
            `composer^${final_composer}`,
            `genre^${final_genre}`,
            `lyricist^${final_lyricist}`,
            `lyrics^${final_lyrics}`,
          ],
          operator: "or",
          type: field_type,
        },
      },
      aggs: {
        genre_filter: {
          terms: {
            field: "genre.keyword",
            size: 10,
          },
        },
        composer_filter: {
          terms: {
            field: "composer.keyword",
            size: 10,
          },
        },
        singer_filter: {
          terms: {
            field: "singer.keyword",
            size: 10,
          },
        },
        lyricist_filter: {
          terms: {
            field: "lyricist.keyword",
            size: 10,
          },
        },
        songTitle_filter: {
          terms: {
            field: "songTitle.keyword",
            size: 10,
          },
        },
      },
    },
  });

  res.send({
    aggs: result.aggregations,
    hits: result.hits.hits,
  });
});

module.exports = router;
