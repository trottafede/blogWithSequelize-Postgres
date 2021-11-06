const { Privilege } = require("../../models");

async function canPatchUsers(req, res, next) {
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Update Users") {
      return next();
    }
  }
  res.status(401).json({
    message: "You do not have privileges to update other users",
    status: 401,
  });
}
module.exports = canPatchUsers;
