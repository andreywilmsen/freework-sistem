const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const pointerController = require("../controller/pointerController");

// Rotas de autenticação e login

router.post("/login", userController.login);

router.post("/login/register", userController.register);

router.put("/login/edit", userController.edit);

router.get("/auth", userController.auth);

// Rotas de registro ponto

router.post("/pointer/get", pointerController.get);

router.post("/pointer/post", pointerController.post);

router.put("/pointer/update", pointerController.update);


module.exports = router;