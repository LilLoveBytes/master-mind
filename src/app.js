// entry point for the application

const express = require("express");
const gameRoute = require("./routes/gameRoutes");
const cors = require("cors"); // for communication between front and back end

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', './src/views');

app.use(cors()); // middleware to enable CORS 
app.use(express.json()); // middleware to parse JSON

app.get("/", (req, res) => {
  res.render("mastermind" , {title: "Mastermind"});
}); //middleware to get the root route

app.use("/game", gameRoute); // middleware to use the gameRoute

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
}); // middleware to listen to the port
