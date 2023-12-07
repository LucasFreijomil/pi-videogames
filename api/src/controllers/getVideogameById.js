const axios = require("axios");
const URL = "https://api.rawg.io/api/games/";
const { Videogame, Genres } = require("../db");
const API_KEY = process.env.DB_API_KEY;

const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params;

  try {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(idVideogame)) {
      const dbGame = await Videogame.findOne({
        where: { id: idVideogame },
        include: Genres,
      });

      if (dbGame) {
        const responseObject = {
          id: dbGame.id,
          name: dbGame.name,
          description: dbGame.description,
          platforms: dbGame.platforms,
          image: dbGame.image,
          released: dbGame.released,
          rating: dbGame.rating,
          genres: dbGame.Genres.map((genre) => genre.name),
        };
        res.json(responseObject);
      }
    } else {
      const apiResponse = await axios.get(
        URL + `${idVideogame}` + `?key=` + API_KEY
      );
      const apiGame = apiResponse?.data;

      if (apiGame) {
        const responseObject = {
          id: apiGame.id,
          name: apiGame.name,
          description: apiGame.description_raw,
          platforms: apiGame.platforms.map(
            (platform) => platform.platform.name
          ),
          image: apiGame.background_image,
          released: apiGame.released,
          rating: apiGame.rating,
          genres: apiGame.genres.map((genre) => genre.name),
        };
        res.json(responseObject);
      } else {
        res.status(404).json({ message: "Game not found" });
      }
    }
  } catch (error) {
    console.error("Error geting game by ID", error);
    res.status(500).json({ message: "Error geting game by ID" });
  }
};

module.exports = getVideogameById;
