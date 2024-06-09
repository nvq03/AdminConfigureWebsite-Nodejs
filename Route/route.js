const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');
const UserController = require('../controller/UserController');
    

    //route admin
    router.get("/", controller.getLoginPage);
    router.get("/signup", controller.getSignupPage);
    router.get("/update/:id", controller.getUpdatePage);
    router.get("/admin", controller.getAdminPage);
    router.get("/delete/:id", controller.getDeletePage);
    router.post("/signup", controller.createUser);
    router.post("/admin", controller.displayUsers) ;
    router.post("/update/:id", controller.updateUser);
    router.post("/login", controller.loginUser);
    router.post("/delete/:id", controller.deleteUser);
    router.post("/search", controller.searchUser);
    router.post("/logout", controller.logoutAdmin);
    router.post("/deleteblog/:id", controller.deleteBlog);
    // route user
    router.post("/home",UserController.DisplayBlogHome);
    router.get("/home", UserController.getHomePage);
    router.post("/blog", UserController.CreateBlog);
    router.get("/blog", UserController.getCreateBlog);
    router.post("/userlogout", UserController.logoutUser);

module.exports = router;