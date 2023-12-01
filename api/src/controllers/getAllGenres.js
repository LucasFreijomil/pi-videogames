const axios = require("axios");
const { Genres } = require("../db");
const API_KEY = process.env.DB_API_KEY;
const URL = "https://api.rawg.io/api/genres?key=";

const getAllGenres = async (req, res) => {
  try {
    const genresFromDatabase = await Genres.findAll();

    if (genresFromDatabase.length === 0) {
      const response = await axios.get(URL + API_KEY);
      const genresFromAPI = response.data.results;

      for (const genre of genresFromAPI) {
        await Genres.create({
          name: genre.name,
        });
      }
    }

    const updatedGenres = await Genres.findAll();

    res.status(200).json(updatedGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = getAllGenres;
