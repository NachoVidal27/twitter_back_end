/**
 * Este middleware es muy similar al middleware
 * https://github.com/jaredhanson/connect-ensure-login
 * creado por el propio autor de Passport.js.
 */

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("usuario no authorizado")
    res.redirect("/");
  }
}

module.exports = isAuthenticated;
