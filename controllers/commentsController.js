const { Article, Comment, Author } = require("../models");

module.exports = {
  index: async (req, res) => {
    const blogs = await Article.findAll();
    res.render("home", { blogs });
  },

  show: async (req, res) => {},
  AdminPage: async (req, res) => {},
  edit: async (req, res) => {},
  destroy: async (req, res) => {},
  update: async (req, res) => {},
  store: async (req, res) => {
    let articleId = req.params.articleId;
    let { name, content } = req.body;

    await Comment.create({
      name,
      content,
      articleId,
    });
    res.redirect(`/articulo/${articleId}`);
  },
  render: async (req, res) => {},
};
