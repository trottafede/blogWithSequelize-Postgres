const { Privilege } = require("../../models");

async function canDeleteUsers(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Delete Users") {
      return next();
    }
  }
  res.status(401).json({
    message:
      "You do not have privileges to delete other users. Only Admins can",
    status: 401,
  });
}
module.exports = canDeleteUsers;
