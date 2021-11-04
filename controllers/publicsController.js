const { Article, Comment, User, Role, Privilege } = require("../models");
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
    const roles = ["Admin", "Editor", "Writer", "Lector"];
    for (let indice = 0; indice < 4; indice++) {
      await Role.findOrCreate({
        where: { roleName: roles[indice] },
        defaults: {
          roleName: roles[indice],
        },
      });
    }

    const AdminPrivileges = [
      "Create Article",
      "Read Articles",
      "Update Articles",
      "Update Comments",
      "Update Own Articles",
      "Delete Articles",
      "Delete Comments",
      "Delete Users",
      "Delete Own User",
      "Delete Own Articles",
      "Make Comments",
    ];

    const LectorPrivileges = ["Make Comments", "Read Articles"];
    const WriterPrivileges = [
      "Make Comments",
      "Create Article",
      "Update Own Articles",
      "Delete Own User",
      "Read Articles",
    ];
    const EditorPrivileges = [
      "Make Comments",
      "Create Article",
      "Update Own Articles",
      "Delete Own User",
      "Read Articles",
      "Update Articles",
      "Delete Comments",
      "Update Comments",
    ];

    for (let indice = 1; indice <= 4; indice++) {
      if (indice === 1) {
        //admin
        for (
          let subIndice = 0;
          subIndice < AdminPrivileges.length;
          subIndice++
        ) {
          await Privilege.create({
            roleId: indice,
            name: AdminPrivileges[subIndice],
          });
        }
      }

      if (indice === 2) {
        //Editor
        for (
          let subIndice = 0;
          subIndice < EditorPrivileges.length;
          subIndice++
        ) {
          await Privilege.create({
            roleId: indice,
            name: EditorPrivileges[subIndice],
          });
        }
      }

      if (indice === 3) {
        //Writer
        for (
          let subIndice = 0;
          subIndice < WriterPrivileges.length;
          subIndice++
        ) {
          await Privilege.create({
            roleId: indice,
            name: WriterPrivileges[subIndice],
          });
        }
      }

      if (indice === 4) {
        //Lector
        for (
          let subIndice = 0;
          subIndice < LectorPrivileges.length;
          subIndice++
        ) {
          await Privilege.create({
            roleId: indice,
            name: LectorPrivileges[subIndice],
          });
        }
      }
    }

    const [user, created] = await User.findOrCreate({
      where: { email: "ftrotta18@gmail.com" },
      defaults: {
        firstname: "Federico",
        lastname: "Trotta",
        email: "ftrotta18@gmail.com",
        password: "asdasd",
        roleId: 1,
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

  aboutPage: async (req, res) => {
    res.render("aboutPage", { user: req.user });
  },
};
