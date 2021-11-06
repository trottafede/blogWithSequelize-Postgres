const { Article, Comment, User, Role, Privilege } = require("../models");
const seeder = require("../models/seeder");
const jwt = require("jsonwebtoken");

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
      "Create Articles",
      "Read Articles",
      "Update Articles",
      "Delete Articles",

      "Create Comments",
      "Read Comments",
      "Update Comments",
      "Delete Comments",

      "Create Users",
      "Read Users",
      "Update Users",
      "Delete Users",

      "Delete Own User",
      "Delete Own Articles",
      "Update Own Articles",
    ];

    const LectorPrivileges = [
      "Create Comments",
      "Read Articles",
      "Delete Own User",
    ];
    const WriterPrivileges = [
      "Create Articles",
      "Read Articles",
      "Update Own Articles",
      "Create Comments",
      "Delete Own User",
    ];
    const EditorPrivileges = [
      "Create Articles",
      "Read Articles",
      "Update Articles",
      "Update Own Articles",

      "Create Comments",
      "Update Comments",
      "Delete Comments",

      "Delete Own User",
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
      where: { email: "admin@admin.com" },
      defaults: {
        firstname: "Federico",
        lastname: "Trotta",
        email: "trotta@trotta.com",
        password: "trotta",
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
    let user = req.user;
    let token = "You can not see the token because not logged in.";

    if (user) {
      const userInDB = await User.findOne({
        where: { id: user.id },
      });
      token = jwt.sign(
        { roleId: userInDB.roleId },
        process.env.JWT_SECRET_TEXT
      );
    }

    res.render("aboutPage", { user, token });
  },
};
