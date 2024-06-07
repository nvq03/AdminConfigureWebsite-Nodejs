const Blog = require("../model/blog");
const User = require("../model/users");
const path = require("path");
const { render } = require("ejs");
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser");


// cấu hình thêm blog
const sharp = require('sharp');
const validator = require('validator');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// trang thêm blog


// Hiển thị trang cập nhật người dùng
exports.getCreateBlog = async (req, res) => {
    res.render("blog");

};

// display trang chủ
exports.DisplayBlogHome = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.cookies.jwt });
    const blogs = await Blog.find();
    res.render("home", { name: user.name, email: user.email, blogs });
  } catch (error) {
    res.status(500).send('Error while fetching blog data');
  }
};

// Hiển thị trang admin
exports.getHomePage = async (req, res) => {
  const user = await User.findOne({ token: req.cookies.jwt });
  const blogs = await Blog.find();
  res.render("home", { name: user.name, email: user.email, blogs });
};

// Đăng xuất người dùng
exports.logoutUser = (req, res) => {
  // Xóa token khỏi cookie
  res.clearCookie('jwt');
  // Sau đó điều hướng người dùng về trang đăng nhập
  res.redirect('/');
};