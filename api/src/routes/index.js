const { Router } = require("express");
const getAllGames = require("../controllers/getAllGames");
const getVideogameById = require("../controllers/getVideogameById");


const router = Router();

router.get("/videogames", getAllGames);
router.get("/videogames/:idVideogame", getVideogameById);

module.exports = router;
