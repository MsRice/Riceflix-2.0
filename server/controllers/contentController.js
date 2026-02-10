const axios = require("axios");
const redis = require("redis");
const client = redis.createClient();

const BASE_URL = "https://api.themoviedb.org/3";
const DISC_URL = "https://api.themoviedb.org/3/discover/movie";
const CACHE_KEY = "wall_data";

async function fetchCategories(url, parameters) {
  const options = {
    method: "GET",
    url: url,
    params: parameters,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const category = await axios.request(options);
  return category.data;
}

async function getWall(req, res) {
  try {
    if (!client.isOpen) await client.connect();

    const cachedData = await client.get(CACHE_KEY);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const [
      trendingAll,
      trendingTV,
      topRatedMovies,
      actionMovies,
      comdeyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    ] = await Promise.all([
      fetchCategories(`${BASE_URL}/trending/all/week`, {
        language: "en-US",
        page: "1",
      }),
      fetchCategories(`${BASE_URL}/trending/tv/day`, {
        language: "en-US",
        page: "1",
      }),
      fetchCategories("https://api.themoviedb.org/3/movie/top_rated", {
        language: "en-US",
        page: "1",
      }),
      fetchCategories(DISC_URL, {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 28,
      }),
      fetchCategories(DISC_URL, {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 35,
      }),
      fetchCategories(DISC_URL, {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 27,
      }),
      fetchCategories(DISC_URL, {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 10749,
      }),
      fetchCategories(DISC_URL, {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 99,
      }),
    ]);
    const categories = {
      trendingAll,
      trendingTV,
      topRatedMovies,
      actionMovies,
      comdeyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    };
    await client.setEx(CACHE_KEY, 14400, JSON.stringify(categories));
    res.json(categories);
  } catch (error) {
    console.error("Wall Error:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getContentDetails(req, res) {
  const { id } = req.params;
  const { type } = req.query;

  if (!["movie", "tv"].includes(type)) {
    return res
      .status(400)
      .json({ message: "Invalid type. Must be 'movie' or 'tv'." });
  }

  const cacheKey = `content_${type}_${id}`;

  try {
    if (!client.isOpen) await client.connect();

    const cachedDetail = await client.get(cacheKey);
    if (cachedDetail) return res.json(JSON.parse(cachedDetail));

    const details = await fecthCategories(`${BASE_URL}/${type}}/${id}`, {
      append_to_response: "videos,credits,similar,watch/providers",
      language: "en-US",
    });

    await client.setEx(cacheKey, 86400, JSON.stringify(details));

    res.json(details);
  } catch (error) {
    res.status(404).json({ message: "Content not found" });
  }
}

async function getSeasonDetails(req, res) {
  try {
    const { id, seasonNumber } = req.params;
    const cacheKey = `tv_${id}_s${seasonNumber}`;

    if (!client.isOpen) await client.connect();

    const cachedSeason = await client.get(cacheKey);
    if (cachedSeason) return res.json(JSON.parse(cachedSeason));

    const seasonData = await fetchCategories(
      `${BASE_URL}/tv/${id}/season/${seasonNumber}`,
      { language: "en-US" },
    );
    await client.setEx(cacheKey, 604800, JSON.stringify(seasonData));

    res.json(seasonData);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Season not found" });
  }
}

async function searchContent(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const normalizedQuery = query.toLowerCase().trim();
    const cacheKey = `search_${normalizedQuery}`;

    if (!client.isOpen) await client.connect();

    const cachedResults = await client.get(cacheKey);
    if (cachedResults) return res.json(JSON.parse(cachedResults));

    const data = await fecthCategories(`${BASE_URL}/search/multi`, {
      query: normalizedQuery,
      include_adult: false,
      language: "en-US",
      page: 1,
    });

    const filteredResults = data.results.filter(
      (item) => item.poster_path || item.profile_path,
    );

    await client.setEx(cacheKey, 86400, JSON.stringify(filteredResults));

    res.json(filteredResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  getWall,
  getContentDetails,
  getSeasonDetails,
  searchContent,
};
