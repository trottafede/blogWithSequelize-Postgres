const { Article, User } = require("../../models");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const articles = await Article.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
    });

    res.json(articles);
  },
  show: async (req, res) => {
    const slug = req.params.slug;

    const article = await Article.findOne({
      where: { slug },
    });

    res.json(article);
  },
  store: async (req, res) => {
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
      userId: 1,
      slug: mySlug,
      resume,
    });

    // await nodeMailer(req.body, "article");
    res.json({ status: 200, response: "Created OK!" });
  },
  update: async (req, res) => {
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
    res.json({ status: 200, response: "Updated ok" });
  },
  destroy: async (req, res) => {
    const slug = req.params.slug;

    await Article.destroy({
      where: {
        slug,
      },
    });
    res.json({ status: 200, response: "Deleted ok" });
  },
  findByUser: async (req, res) => {
    const lastname = req.params.user;
    const user = await User.findOne({
      where: { lastname },
    });

    const articles = await Article.findAll({
      where: {
        userId: user.id,
      },
    });

    res.json(articles);
  },
};
