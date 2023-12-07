const axios = require("axios");
const URL = "https://api.rawg.io/api/games";
const { Videogame, Genres } = require("../db");
const API_KEY = process.env.DB_API_KEY;

const getAllGames = async (req, res) => {
  try {
    const apiResponse1 = (
      await axios.get(`${URL}?page_size=25&page=1&key=${API_KEY}`)
    );
    const apiResponse2 = (
      await axios.get(`${URL}?page_size=25&page=2&key=${API_KEY}`)
    );
    const apiResponse3 = (
      await axios.get(`${URL}?page_size=25&page=3&key=${API_KEY}`)
    );
    const apiResponse4 = (
      await axios.get(`${URL}?page_size=25&page=4&key=${API_KEY}`)
    );
    const dbGames = await Videogame.findAll({
      include: Genres,
    });

    const apiGames = [...apiResponse1.data.results, ...apiResponse2.data.results, ...apiResponse3.data.results, ...apiResponse4.data.results].map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    }));

    const allGames = [
      ...apiGames,
      ...dbGames.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms,
        image: game.image,
        released: game.released,
        rating: game.rating,
        genres: game.Genres.map((genre) => genre.name),
      })),
    ];
    res.json(allGames);
  } catch (error) {
    console.error("Error geting games", error);
    res.status(500).json({ mensaje: "Error geting games" });
  }
};

module.exports = getAllGames;
