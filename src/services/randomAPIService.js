// Handles the integration with Random.org API

const axios = require("axios");

exports.generateSecretCombo = async () => {
	const url = "https://www.random.org/integers/";
	const params = {
		num: 4,
		min: 0,
		max: 7,
		col: 1,
		base: 10,
		format: "plain",
	};
	try {
		const response = await axios.get(url, { params });
		return response.data.trim().split("\n");
	} catch (error) {
		throw new Error("Error fetching numbers", error);
	}
};

exports.giveFeedback = (guessArray, secretCombo) => {
	// initialize counts
	let correctNumbers = 0;
	let correctPositions = 0;

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
				correctPositions++;
			}

			return (
				correctNumbers +
				" correct number(s) " +
				"with " +
				correctPositions +
				" in the correct position"
			);
		}
	}

	exports.getGameStatus = () => {
		// return number of guesses made & attempts remaining
		try {
			const status = {
				attemptsMade: attempts,
				attemptsRemaining: 10 - attempts,
			};
			res.status(200).json({ message: "Game status", status });
		} catch (error) {
			res.status(500).json({ message: "Error getting game status", error });
		}
	};
};
