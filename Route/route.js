const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

    router.get("/login", controller.getLoginPage);
    router.get("/signup", controller.getSignupPage);
    router.get("/update/:id", controller.getUpdatePage);
    router.get("/home", controller.getHomePage);
    router.get("/delete/:id", controller.getDeletePage);
    router.post("/signup", controller.createUser);
    router.post("/home", controller.displayUsers);
    router.post("/update/:id", controller.updateUser);
    router.post("/login", controller.loginUser);
    router.post("/delete/:id", controller.deleteUser);

module.exports = router;