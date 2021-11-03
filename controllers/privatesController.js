const { Article, Comment, User, Role } = require("../models");
const nodeMailer = require("../middlewares/nodemailer");
const slugify = require("slugify");

module.exports = {
  showAdmin: async (req, res) => {
    const articles = await Article.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    });

    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Role,
        },
      ],
    });

    res.render("admin", {
      blogs: articles,
      user: req.user,
      users,
    });
  },
  showEditor: async (req, res) => {
    const articles = await Article.findAll({
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
      blogs: articles,
      user: req.user,
    });
  },
  showWriter: async (req, res) => {
    const articles = await Article.findAll({
      where: {
        userId: req.user.dataValues.id,
      },
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
      blogs: articles,
      user: req.user,
    });
  },
  showLector: async (req, res) => {},

  showProfile: async (req, res) => {
    const user = req.user;
    res.render("myProfile", { user });
  },

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
      user: name,
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
  destroyUser: async (req, res) => {
    const id = req.params.id;

    await User.destroy({
      where: {
        id,
      },
    });
    res.redirect("/admin"); // View
  },
};
