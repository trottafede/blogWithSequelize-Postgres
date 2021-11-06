const { Privilege } = require("../../models");

async function canDeleteUser(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Delete Own User") {
      return next();
    }
  }
  res
    .status(401)
    .json({
      message: "You do not have privileges to delete your account.",
      status: 401,
    });
}
module.exports = canDeleteUser;
