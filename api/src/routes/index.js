const { Router } = require("express");
const getAllGames = require("../controllers/getAllGames");

const router = Router();

router.get("/videogames", getAllGames);

module.exports = router;
