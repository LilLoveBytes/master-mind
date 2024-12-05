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

