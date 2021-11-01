const { Article, Comment, User } = require("../models");
const seeder = require("../models/seeder");
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

    res.render("home", { blogs: articles, user: req.user });
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
      user: req.user,
    }); //View
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

  createUser: (req, res) => {
    res.render("createUser", { user: req.user });
  },

  storeUser: async (req, res) => {
    let { name, lastname, email, password } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstname: name,
        lastname,
        email,
        password,
      },
    });

    if (created) {
      req.login(user, () => res.redirect("/admin"));
    } else {
      res.redirect("/login");
    }
  },

  createLogIn: async (req, res) => {
    res.render("loginForm", { user: req.user });
  },

  generateArticles: async (req, res) => {
    await User.findOrCreate({
      where: { email: "ftrotta18@gmail.com" },
      defaults: {
        firstname: "Federico",
        lastname: "Trotta",
        email: "ftrotta18@gmail.com",
        password: "asdasd",
      },
    });

    for (let indice = 0; indice < seeder.length; indice++) {
      await Article.findOrCreate({
        where: { slug: seeder[indice].slug },
        defaults: {
          title: seeder[indice].title,
          content: seeder[indice].content,
          image: seeder[indice].image,
          userId: 1,
          slug: seeder[indice].slug,
          resume: seeder[indice].resume,
        },
      });
    }
    res.redirect("/");
  },

  logOut: async (req, res) => {
    // await req.session.destroy();
    req.logout();

    res.redirect("/"); // will always fire after session is destroyed
  },
};
