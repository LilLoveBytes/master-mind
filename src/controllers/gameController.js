// this module handles game logic (start, guess, feedback)

const random = require("../services/randomAPIService");

let secretCombo = [];
let attempts = 0;
let guesses = [];

exports.startGame = async (req, res) => {
	try {
		secretCombo = await random.generateSecretCombo();
		attempts = 0;
    guesses = [];
		console.log("Secret combo:", secretCombo);
		res
			.status(200)
			.json({ message: "A 4 digit code", secretCombo: secretCombo });
	} catch (error) {
		res.status(500).json({ message: "Error starting game", error });
	}
};

exports.submitGuess = async (req, res) => {
	try {
		const { guess } = req.body;
		if (secretCombo.length === 0) {
			await this.startGame(req, res);
		}
		if (!guess || guess.length !== 4) {
			return res
				.status(400)
				.json({ message: "Guess must be exactly 4 numbers long" });
		}
		attempts++;
		guesses.push(guess);

		if (attempts > 10) {
			return res
				.status(400)
				.json({ message: "You've made 10 incorrect guesses. Game over!" });
		}
		const guessArray = guess.split("");
		console.log("Guess array:", guessArray);

		const feedback = this.giveFeedback(guessArray, secretCombo);
		const gameHistory = await this.getGameStatus(req, res);
		res.status(200).json({ message: "Guess submitted", feedback, gameHistory });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error submitting guess", error });
	}
};

exports.getGameStatus = (req, res) => {
	try {
		if (secretCombo.length === 0) {
			return res.status(200).json({ message: "Game has not started" });
		}

		let attemptsMade = attempts;
		let attemptsRemaining = 10 - attempts;

		return  `${attemptsMade} guess(es) made so far. ${attemptsRemaining} attempts remaining. \nGuesses: ${guesses}`;  

	} catch (error) {
		// res.status(500).json({ message: "Error getting game status", error });
		console.error(error);
	}
};

exports.giveFeedback = (guessArray, secretCombo) => {
	// initialize counts
	let correctNumbers = 0;
	let exactMatchces = 0;

	// compare guess to secret combo
	// if guess matches, return "You win!"
	if (guessArray === secretCombo) {
		return "You win!";
	} else {
		// if guess doesn't match, return conditional feedback

		//check for correct numbers (any position)
		for (let i = 0; i < guessArray.length; i++) {
			if (secretCombo.includes(guessArray[i])) {
				correctNumbers++;
			}
		}
		// check for correct positions (exact matches)
		for (let i = 0; i < guessArray.length; i++) {
			if (guessArray[i] === secretCombo[i]) {
				exactMatchces++;
			}

			return (
				correctNumbers +
				" correct number(s) " +
				"with " +
				exactMatchces +
				" in the correct position"
			);
		}
	}
};
