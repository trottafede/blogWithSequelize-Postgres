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
    const slug = req.params.slug;
    const article = await Article.findOne({
      where: { slug },
    });
    let { name, content } = req.body;

    await Comment.create({
      name,
      content,
      articleId: article.id,
    });
    res.redirect(`/articulo/${slug}`);
  },
  render: async (req, res) => {},
};
