const axios = require('axios');
const URL = "https://api.rawg.io/api/games?search=";
const { Videogame, Genres } = require("../db");
const { Op } = require('sequelize');
const API_KEY = process.env.DB_API_KEY;


const getGamesByName = async (req, res) => {
  const { name } = req.params;

  try {
   
    const dbGames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, 
        },
      },
      include: Genres,
    });

    const apiResponse = await axios.get(URL + name + `&key=` + API_KEY);

    const apiGames = apiResponse.data.results;

    const mergedGames = [
      ...dbGames.map((dbGame) => ({
        id: dbGame.id,
        name: dbGame.name,
        description: dbGame.descripcion,
        platforms: dbGame.platforms,
        image: dbGame.image,
        released: dbGame.released,
        rating: dbGame.rating,
        genres: dbGame.Genres.map((genre) => genre.name)
      })),
      ...apiGames.map((apiGame) => ({
        id: apiGame.id,
        name: apiGame.name,
        description: apiGame.description,
        platforms: apiGame.platforms.map((platform) => platform.platform.name),
        image: apiGame.background_image,
        released: apiGame.released,
        rating: apiGame.rating,
        genres: apiGame.genres.map((genre) => genre.name),
      })),
    ];

    if (mergedGames.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron juegos.' });
    }

    const first15Results = mergedGames.slice(0, 15);
    res.json(first15Results);
  } catch (error) {
    console.error('Error geting games by name', error);
    res.status(500).json({ mensaje: 'Error geting games by name' });
  }
};

module.exports = getGamesByName;