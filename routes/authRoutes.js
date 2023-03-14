const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */

// router.get("/", redirectIfAuthenticated, authController.show);
// router.post("/login", authController.logInUser);
router.get("/logout", authController.logout);

module.exports = router;
