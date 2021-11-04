const { Article, Comment, User } = require("../../models");

module.exports = {
  index: async (req, res) => {
    const comments = await Comment.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(comments);
  },
  store: async (req, res) => {
    const slug = req.params.slug;
    let { content } = req.body;

    const article = await Article.findOne({
      where: { slug },
    });

    const userId = req.user.sub;

    const user = await User.findOne({
      where: { id: userId },
    });

    let name = user.firstname + " " + user.lastname;

    await Comment.create({
      name,
      content,
      articleId: article.id,
    });
    res.json({ status: 200, response: "Commented ok" });
  },
  update: async (req, res) => {
    const id = req.params.commentId;
    let { content } = req.body;

    await Comment.update(
      {
        content,
        updated_at: Date.now(),
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({ status: 200, response: "Comment updated  ok" });
  },
  destroy: async (req, res) => {
    const id = req.params.id;

    await Comment.destroy({
      where: {
        id,
      },
    });
    res.json({ status: 200, response: "Comment deleted ok" });
  },
};
