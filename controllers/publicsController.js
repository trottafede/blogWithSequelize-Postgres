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

  generateArticles: async (req, res) => {
    let [user, created] = await User.findOrCreate({
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
          userId: user.id,
          slug: seeder[indice].slug,
          resume: seeder[indice].resume,
        },
      });
    }
    res.redirect("/");
  },
};
