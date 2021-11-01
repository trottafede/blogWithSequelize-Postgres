const { Article, Comment, User } = require("../models");
const nodeMailer = require("../middlewares/nodemailer");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const article = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    res.render("admin", {
      blogs: article,
      comments: article,
      users: article,
      user: req.user,
    });
  },
  // show: (req, res) => {},

  createArticle: async (req, res) => {
    let users = await User.findAll();
    res.render("createArticle", { users, user: req.user });
  },

  storeArticle: async (req, res) => {
    let { title, image, content, resume } = req.body;

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
      userId: req.user.dataValues.id,
      slug: mySlug,
      resume,
    });

    await nodeMailer(req.body, "article");

    res.redirect("/admin");
  },

  storeComment: async (req, res) => {
    const slug = req.params.slug;
    const article = await Article.findOne({
      where: { slug },
    });
    let { content } = req.body;

    let name =
      req.user.dataValues.firstname + " " + req.user.dataValues.lastname;

    await Comment.create({
      name,
      content,
      articleId: article.id,
    });
    let body = {
      article: slug,
      name,
      content,
    };
    await nodeMailer(body, "comment");

    res.redirect(`/article/${slug}`);
  },

  editArticle: async (req, res) => {
    const slug = req.params.slug;

    const singleBlog = await Article.findOne({
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

    res.render("updateArticle", {
      singleBlog,
      user: req.user,
    });
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
