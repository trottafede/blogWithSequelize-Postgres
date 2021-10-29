const { Client } = require("pg");

module.exports = {
  NotFoundPage: (req, res) => {
    res.send("Entraste a cualquier lado bro xD");
  },
  ApiArticles: (req, res) => {
    const client = new Client({
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    client.connect(function (err) {
      if (err) throw err;
    });

    // simple query
    client.query(
      "SELECT * FROM articles ORDER BY created_at DESC",
      (err, result) => {
        if (err) throw err;
        res.json(result.rows);
        client.end();
      }
    );
  },
};
