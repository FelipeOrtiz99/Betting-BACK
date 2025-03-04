// routes/externalApiRoutes.js
const express = require("express");
const router = express.Router();
const { fetchData, fetchOdds, fetchOddsTeamsNPlayers } = require("../controllers/sportApiController");

// Ruta para obtener datos de la API externa
router.get("/data", fetchData);
router.get("/:sport/:league/:matchId/odds", fetchOdds);
router.get("/:sport/:league/:matchId/odds/teamsnplayers", fetchOddsTeamsNPlayers);

module.exports = router;
