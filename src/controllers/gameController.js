// this module handles game logic (start, guess, feedback)

const random = require('../services/randomAPIService');

let secretCombo = [];
let attempts = 0;

exports.startGame = async (req, res) => {
  try {
    secretCombo = await random.generateSecretCombo();
    attempts = 0;
    console.log("Secret combo:", secretCombo);
    res.status(200).json({ message: "A 4 digit code", secretCombo: secretCombo });
  }
  catch (error) {
    res.status(500).json({ message: "Error starting game", error });
  }
}

exports.submitGuess = (req, res) => {
  try {
    const { guess } = req.body;
    if (!guess || guess.length !== 4) {
      return res.status(400).json({ message: "Guess must be exactly 4 numbers long" });
    }
    if (secretCombo.length === 0) {
      return res.status(400).json({ message: "Game has not started" });
    }
    attempts++;
    if (attempts > 10) {
      return res.status(400).json({ message: "You've made 10 incorrect guesses. Game over!" });
    }
    const guessArray = guess.split("");
    console.log("Guess array:", guessArray);
    
    const feedback = random.giveFeedback(guessArray, secretCombo);
    res.status(200).json({ message: "Guess submitted", feedback });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting guess", error });
  }
}

exports.getGameStatus = (req, res) => {
  try {
    const status = random.getGameStatus();
    res.status(200).json({ message: "Game status", status });
  }
  catch (error) {
    res.status(500).json({ message: "Error getting game status", error });
  }
}