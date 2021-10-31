const { Article, Comment, User } = require("../models");

module.exports = {
  index: async (req, res) => {
    const articles = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
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
          model: User,
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

  createSignUp: async (req, res) => {},
  createUser: (req, res) => {
    res.render("createUser");
  },
  storeUser: async (req, res) => {
    let { name, lastname, email, password } = req.body;
    User.create({
      firstname: name,
      lastname,
      email,
      password,
    }).then((user) => {
      res.redirect("/admin");
    });

    // res.status(400).send("Hacker sorete no te metas");
  },

  storeSignUp: async (req, res) => {},

  createLogIn: async (req, res) => {
    res.render("loginForm");
  },

  storeLogIn: async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } }).then(async function (user) {
      if (!user) {
        res.redirect("/signup");
      } else if (!(await user.validPassword(password))) {
        res.redirect("/login");
      } else {
        // req.session.user = user.dataValues;
        res.redirect("/");
      }
    });
  },

  logOut: async (req, res) => {},
};
