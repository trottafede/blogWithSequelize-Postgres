const { Privilege } = require("../../models");

async function canPatchComments(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Update Comments") {
      return next();
    }
  }
  res.status(401).json({
    message:
      "You do not have privileges to update comments. Only Editors and Admins can",
    status: 401,
  });
}
module.exports = canPatchComments;
