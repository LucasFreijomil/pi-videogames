const axios = require("axios");
const URL = "https://api.rawg.io/api/games";
const { Videogame, Genres } = require("../db");
const API_KEY = process.env.DB_API_KEY;

const getAllGames = async (req, res) => {
  try {
    const apiResponse = (
      await axios.get(`${URL}?page_size=40&page=1&key=${API_KEY}`)
    ).data.results;
    const dbGames = await Videogame.findAll({
      include: Genres,
    });

    const apiGames = [...apiResponse].map((game) => ({
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
