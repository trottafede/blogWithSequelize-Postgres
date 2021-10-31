const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

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

routes(app);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
