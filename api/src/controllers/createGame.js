const { Videogame, Genres } = require("../db");

const createGame = async (req, res) => {
  try {
    const { name, image, description, platforms, released, rating, genres } =
      req.body;

    if (!Array.isArray(genres)) {
      return res.status(400).json({ mensaje: "Genres should be an array" });
    }

    const dbGame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
    });

    const genrePromises = genres.map(async (genreName) => {
      const [genre] = await Genres.findOrCreate({
        where: { name: genreName },
      });
      return genre;
    });

    const genresResolved = await Promise.all(genrePromises);
    await dbGame.addGenres(genresResolved);

    res.status(201).json({ created: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error adding game to DB" });
  }
};

module.exports = createGame;
