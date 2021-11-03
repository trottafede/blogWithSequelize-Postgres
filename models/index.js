"use strict";

const Sequelize = require("sequelize");
const CommentModel = require("./Comment.js");
const ArticleModel = require("./Article.js");
const UserModel = require("./User.js");
const RoleModel = require("./Role.js");
const PrivilegeModel = require("./Privilege.js");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: require("pg"),
    logging: false, //Disable sequelize from loggin to the CLI
  }
);

const Comment = CommentModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Privilege = PrivilegeModel(sequelize, Sequelize);

Article.belongsTo(User, { onDelete: "cascade" });
User.hasMany(Article);

Comment.belongsTo(Article, { onDelete: "cascade" });
Article.hasMany(Comment);

User.belongsTo(Role, { onDelete: "cascade" });
Role.hasMany(User);

Privilege.belongsTo(Role, { onDelete: "cascade" });
Role.hasMany(Privilege);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Article,
  Comment,
  Role,
  Privilege,
};
