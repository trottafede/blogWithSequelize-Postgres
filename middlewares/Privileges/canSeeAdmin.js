const canSeeAdmin = async (req, res, next) => {
  if (req.user.roleId == 4) {
    return res.redirect("/admin/lector");
  }
  if (req.user.roleId == 3) {
    return res.redirect("/admin/writer");
  }
  if (req.user.roleId == 2) {
    return res.redirect("/admin/editor");
  }
  if (req.user.roleId == 1) {
    return next();
  }
  res
    .status(401)
    .json({
      message:
        "You do not have privileges to see admin. Only Lectors, Writers and Admins can",
      status: 401,
    });
};

module.exports = canSeeAdmin;
