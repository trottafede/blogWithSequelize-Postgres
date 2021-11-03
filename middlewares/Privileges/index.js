const canComment = require("./canComment");
const canCreate = require("./canCreate");
const canUpdate = require("./canUpdate");
const canDelete = require("./canDelete");
const canSeeAdmin = require("./canSeeAdmin");

module.exports = { canComment, canCreate, canUpdate, canDelete, canSeeAdmin };
