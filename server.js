const express = require("express");
const app = express();
const router = require("./routes");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8000;

// const db = require("./models");
// db.sequelize
//   .sync({ force: true })
//   .then(() => console.log("Tables have been created"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
