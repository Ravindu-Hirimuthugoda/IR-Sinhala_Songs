"use strict";

const express = require("express");
const router = express.Router();

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

router.post("/", async function (req, res) {
  var query = req.body.query;
  var query_words = query.trim();

  var size = 100;

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
      query: {
        match_phrase: {
          "lyricist.keyword": query_words,
        },
      },
    },
  });

  res.send({
    hits: result.hits.hits,
  });
});

module.exports = router;
