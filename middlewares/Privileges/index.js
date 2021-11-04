const canComment = require("./canComment");
const canCreate = require("./canCreate");
const canUpdate = require("./canUpdate");
const canDeleteArticles = require("./canDeleteArticles");
const canSeeAdmin = require("./canSeeAdmin");
const canDeleteUser = require("./canDeleteUser");

module.exports = {
  canComment,
  canCreate,
  canUpdate,
  canDeleteArticles,
  canSeeAdmin,
  canDeleteUser,
};
