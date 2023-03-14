function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home"); // Cambiar "/admin" por la ruta a donde se quiere redirigir al usuario. También se puede dejar como está.
  } else {
    return res.redirect("/");
  }
}

module.exports = redirectIfAuthenticated;
