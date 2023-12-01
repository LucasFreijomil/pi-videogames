const { Router } = require("express");
const getAllGames = require("../controllers/getAllGames");
const getVideogameById = require("../controllers/getVideogameById");
const getGamesByName = require("../controllers/getGamesByName");

const router = Router();

router.get("/videogames", getAllGames);
router.get("/videogames/:idVideogame", getVideogameById);
router.get("/videogames/name/:name", getGamesByName);

module.exports = router;
