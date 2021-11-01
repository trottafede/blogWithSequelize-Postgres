require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const port = process.env.PORT || 8000;
const passport = require("./middlewares/passport");

// const db = require("./models");
// db.sequelize
//   .sync({ force: true })
//   .then(() => console.log("Tables have been created"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
passport(app);

// Routes
routes(app);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
