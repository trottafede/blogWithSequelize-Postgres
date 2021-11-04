const { User } = require("../../models");

module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      limit: 200,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(users);
  },
  store: async (req, res) => {
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
      res.json({ status: 200, response: "Created OK!" });
    } else {
      res.status(400).json({ status: 400, response: "Already created" });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    let { name, lastname, email, password } = req.body;
    await User.update(
      {
        name,
        lastname,
        email,
        password,
        updated_at: Date.now(),
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({ status: 200, response: "Updated ok" });
  },
  destroy: async (req, res) => {
    const id = req.params.id;

    await User.destroy({
      where: {
        id,
      },
    });
    res.json({ status: 200, response: "Deleted ok" });
  },
};
