const { Article, Comment, Author } = require("../models");

module.exports = {
  index: async (req, res) => {},
  show: async (req, res) => {},
  edit: async (req, res) => {},
  destroy: async (req, res) => {},
  update: async (req, res) => {},

  store: async (req, res) => {
    let { name, lastname, email } = req.body;
    Author.create({
      firstname: name,
      lastname: lastname,
      email: email,
    }).then((user) => {
      res.redirect("/admin");
    });

    // res.status(400).send("Hacker sorete no te metas");
  },
  render: (req, res) => {
    res.render("createAuthor");
  },
};
