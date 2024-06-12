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
exports.CreateBlog = [
  upload.single('image'), 
  async (req, res) => {
    try {
      const { title, description } = req.body;
      let image = null;

      if (req.file) {
        image = req.file.path; 
      }

      if (!validator.isLength(title, { min: 3, max: 100 })) {
        throw new Error('Tiêu đề phải có từ 3 đến 100 ký tự');
      }
      if (!validator.isLength(description, { min: 10, max: 500 })) {
        throw new Error('Mô tả phải có từ 10 đến 500 ký tự');
      }

      const newBlog = new Blog({ image, title, description });
      await newBlog.save();

      const user = await User.findOne({ token: req.cookies.jwt });
      const blogs = await Blog.find();
      res.redirect("/home")
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
];

// Hiển thị trang blog
exports.getCreateBlog = async (req, res) => {
    res.render("blog");

};

// display trang chủ
exports.DisplayBlogHome = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.cookies.jwt });
    const blogs = await Blog.find();
    res.redirect("/home");
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
