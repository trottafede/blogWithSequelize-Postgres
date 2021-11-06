const canComment = require("./canComment");
const canCreateArticles = require("./canCreateArticles");
const canUpdateOwnArticles = require("./canUpdateOwnArticles");
const canDeleteArticles = require("./canDeleteArticles");
const canSeeAdmin = require("./canSeeAdmin");
const canDeleteUser = require("./canDeleteUser");
const canDeleteUsers = require("./canDeleteUsers");
const canPatchUsers = require("./canPatchUsers");
const canReadUsers = require("./canReadUsers");
const canCreateUsers = require("./canCreateUsers");
const canDeleteComments = require("./canDeleteComments");
const canPatchComments = require("./canPatchComments");
const canDeleteOwnArticles = require("./canDeleteOwnArticles");
const canUpdateArticles = require("./canPatchArticles");

module.exports = {
  canComment,
  canCreateArticles,
  canUpdateOwnArticles,
  canDeleteArticles,
  canSeeAdmin,
  canDeleteUser,
  canDeleteUsers,
  canPatchUsers,
  canReadUsers,
  canCreateUsers,
  canDeleteComments,
  canPatchComments,
  canDeleteOwnArticles,
  canUpdateArticles,
};
