// Defines API routes for starting a game, making guesses, etc.

const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.post("/start", gameController.startGame);
router.post("/guess", gameController.submitGuess);
router.get("/status", gameController.getGameStatus);
module.exports = router;
