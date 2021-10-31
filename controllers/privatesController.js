const { Article, Comment, Author } = require("../models");
const nodeMailer = require("../middlewares/nodemailer");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const article = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
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
  // show: (req, res) => {},

  createArticle: async (req, res) => {
    let users = await Author.findAll();
    res.render("createArticle", { users });
  },
  createAuthor: (req, res) => {
    res.render("createAuthor");
  },

  storeArticle: async (req, res) => {
    let { title, image, author_id, content, resume } = req.body;

    let mySlug = slugify(title, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: "uy", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    await Article.create({
      title,
      content,
      image,
      authorId: author_id,
      slug: mySlug,
      resume,
    });

    await nodeMailer(req.body);

    res.redirect("/admin");
  },
  storeAuthor: async (req, res) => {
    let { name, lastname, email, password } = req.body;
    Author.create({
      firstname: name,
      lastname,
      email,
      password,
    }).then((user) => {
      res.redirect("/admin");
    });

    // res.status(400).send("Hacker sorete no te metas");
  },

  editArticle: async (req, res) => {
    const slug = req.params.slug;

    const singleBlog = await Article.findOne({
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

    res.render("updateArticle", { singleBlog, author: singleBlog });
  },
  updateArticle: async (req, res) => {
    const { title, content, image, resume } = req.body;
    const slug = req.params.slug;

    let mySlug = slugify(title, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      locale: "uy", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    await Article.update(
      {
        title,
        content,
        image,
        slug: mySlug,
        resume,
        updated_at: Date.now(),
      },
      {
        where: {
          slug,
        },
      }
    );

    res.redirect("/admin");
  },
  destroyArticle: async (req, res) => {
    const slug = req.params.slug;

    await Article.destroy({
      where: {
        slug,
      },
    });
    res.redirect("/admin"); // View
  },
};
