function checkIfAdmin(req, res, nect) {
  if (req.user.role.id === 1) {
    next();
  } else {
    res.redirect("/ndo-not-have-privileges");
  }
}

/*
    para las rutas admin?
    app.delete ("/admin/articulos", [checkIfAdmin, isLoggedIn], articlesController.destroy);
*/
