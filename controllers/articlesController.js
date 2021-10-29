const { Article, Comment, Author } = require("../models");
const nodeMailer = require("../middlewares/nodemailer");
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
    let id = req.params.id;

    const article = await Article.findByPk(id, {
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

  AdminPage: async (req, res) => {
    const article = await Article.findAll({
      include: [
        {
          model: Author,
        },
        {
          model: Comment,
        },
      ],
    });

    res.render("admin", {
      blogs: article,
      comments: article,
      authors: article,
    });
  },

  edit: async (req, res) => {
    let id = req.params.id;

    const singleBlog = await Article.findByPk(id, {
      include: [
        {
          model: Author,
        },
        {
          model: Comment,
        },
      ],
    });

    res.render("updateArticle", { singleBlog, author: singleBlog });
  },

  destroy: async (req, res) => {
    let id = req.params.id;

    await Article.destroy({
      where: {
        id,
      },
    });
    res.redirect("/admin"); // View
  },

  update: async (req, res) => {
    const { title, content, image } = req.body;
    const id = req.params.id;

    await Article.update(
      {
        title,
        content,
        image,
        updated_at: Date.now(),
      },
      {
        where: {
          id,
        },
      }
    );

    res.redirect("/admin");
  },

  store: async (req, res) => {
    let { title, content, author_id, image } = req.body;

    await nodeMailer(req.body);

    Article.create({
      title: title,
      content: content,
      image: image,
      authorId: author_id,
    }).then((user) => {
      res.redirect("/admin");
    });

    // res.status(400).send("Hacker sorete no te metas");
  },
  render: async (req, res) => {
    let users = await Author.findAll();
    res.render("createArticle", { users });
  },
};
