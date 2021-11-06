const { Privilege } = require("../../models");

async function canDeleteComments(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Delete Comments") {
      return next();
    }
  }
  res.status(401).json({
    message:
      "You do not have privileges to delete comments. Only Editors and Admins can",
    status: 401,
  });
}
module.exports = canDeleteComments;
