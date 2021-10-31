const { Article, Comment, Author } = require("../models");

module.exports = {
  index: async (req, res) => {
    const articles = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Author,
        },
      ],
    });

    res.render("home", { blogs: articles });
  },
  show: async (req, res) => {
    const slug = req.params.slug;

    const article = await Article.findOne({
      where: { slug },
      include: [
        {
          model: Author,
        },
        {
          model: Comment,
        },
      ],
    });

    res.render("article", {
      singleBlog: article,
    }); //View
  },

  storeComment: async (req, res) => {
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
    res.redirect(`/article/${slug}`);
  },

  NotFoundPage: (req, res) => {
    res.send("Entraste a cualquier lado bro xD");
  },
  ApiArticles: async (req, res) => {
    const articles = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
    });
    res.json(articles);
  },

  createSignUp: async (req, res) => {
    res.render("signUpForm");
  },
  storeSignUp: async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  },
  createLogIn: async (req, res) => {},
  storeLogIn: async (req, res) => {},
  logOut: async (req, res) => {},
};
