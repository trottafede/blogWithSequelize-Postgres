const { Privilege } = require("../../models");

async function canReadUsers(req, res, next) {
  console.log(req.user);
  let privileges = await Privilege.findAll({
    where: {
      roleId: req.user.roleId,
    },
  });
  for (let indice = 0; indice < privileges.length; indice++) {
    if (privileges[indice].dataValues.name == "Read Users") {
      return next();
    }
  }
  res.status(401).json({
    message: "You do not have privileges to Read Users ",
    status: 401,
  });
}
module.exports = canReadUsers;
