"use strict";

const express = require("express");
const router = express.Router();

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

router.get("/", async function (req, res) {

  var result = await client.search({
    index: "sinhala_songs_index",
    size: 0,
    aggs: {
      genre_filter: {
        terms: {
          field: "genre.keyword",
          size: 100,
        },
      },
      singer_filter: {
        terms: {
          field: "singer.keyword",
          size: 100,
        },
      },
      composer_filter: {
        terms: {
          field: "composer.keyword",
          size: 100,
        },
      },
      lyricist_filter: {
        terms: {
          field: "lyricist.keyword",
          size: 100,
        },
      },
    },
  });

  res.send({
    aggs: result.aggregations,
  });
});

module.exports = router;
