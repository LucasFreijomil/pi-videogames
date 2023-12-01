const { Router } = require("express");
const getAllGames = require("../controllers/getAllGames");
const getVideogameById = require("../controllers/getVideogameById");
const getGamesByName = require("../controllers/getGamesByName");
const createGame = require("../controllers/createGame");
const getGenres = require("../controllers/getAllGenres");


const router = Router();

router.get("/videogames", getAllGames);
router.get("/videogames/:idVideogame", getVideogameById);
router.get("/videogames/name/:name", getGamesByName);
router.post("/create", createGame);
router.get("/genres", getGenres);


module.exports = router;