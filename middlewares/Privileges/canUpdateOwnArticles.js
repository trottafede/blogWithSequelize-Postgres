const { Privilege } = require("../../models");

async function canUpdateOwnArticles(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Update Own Articles") {
      return next();
    }
  }
  res.status(401).json({
    message:
      "You do not have privileges to update Own Articles. Only Editors and Admin can",
    status: 401,
  });
}
module.exports = canUpdateOwnArticles;
