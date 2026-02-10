const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContentSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    release_date: {
      type: Date,
    },
    trailer_url: {
      type: String,
    },
    cover_url: {
      type: String,
    },
    tmdb_id: {
      type: String,
    },
  },
  {
    discriminatorKey: "content_type",
    timestamps: true,
  },
);

const Content = mongoose.model("Content", ContentSchema);

const MovieSchema = Content.discriminator(
  "movie",

  new Schema({
    duration: {
      type: Number,
    },
  }),
);

const EpisodeSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  cover_url: {
    type: String,
  },
});

const SeasonSchema = new Schema({
  season_number: {
    type: Number,
  },
  episodes: [EpisodeSchema],
});

const TvSchema = Content.discriminator(
  "tv",
  new Schema({
    is_ongoing: {
      type: Boolean,
    },
    seasons: {
      type: [SeasonSchema],
    },
  }),
);

module.exports = Content;
