"use strict";

const express = require("express");
const router = express.Router();

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

router.get("/", async function (req, res) {

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
        match_all: {}
      },
    },
  });

  res.send({
    hits: result.hits.hits,
  });
});

module.exports = router;
