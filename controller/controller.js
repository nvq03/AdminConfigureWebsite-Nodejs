// controllers/controller.js

const collection = require("../model/users");

// Hiển thị trang đăng nhập
exports.getLoginPage = (req, res) => {
  res.render("login");
};

// Hiển thị trang đăng ký
exports.getSignupPage = (req, res) => {
  res.render("signup");
};

// Hiển thị trang cập nhật người dùng
exports.getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  const user = await collection.findOne({ _id: userId });

  if (user) {
    res.render("update", { userId: userId, user: user });
  } else {
    res.send("Không tìm thấy người dùng");
  }
};

// Hiển thị trang chủ
exports.getHomePage = async (req, res) => {
  const users = await collection.find();
  res.render("home", { users });
};

// Hiển thị trang xóa người dùng
exports.getDeletePage = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await collection.findOne({ _id: userId });
    if (user) {
      res.render("delete", { userId: userId, user: user });
    } else {
      res.send("Người dùng không tồn tại");
    }
  } catch (error) {
    console.error("Lỗi khi xác nhận xóa người dùng:", error);
    res.send("Đã xảy ra lỗi trong quá trình xác nhận xóa người dùng");
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  };

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("Người dùng đã tồn tại, vui lòng chọn tên khác");
  } else {
    await collection.insertMany(data);
    res.redirect("/home");
    console.log("Thêm người dùng thành công");
  }
};

// Hiển thị danh sách người dùng
exports.displayUsers = async (req, res) => {
  const users = await collection.find();
  res.render("home", { users });
};

// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = {
    name: req.body.username,
    password: req.body.password
  };

  try {
    await collection.updateOne({ _id: userId }, { $set: updatedData });
    console.log("Cập nhật người dùng thành công");
    res.redirect("/home");
  } catch(error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.send("Đã xảy ra lỗi trong quá trình cập nhật người dùng");
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await collection.findOne({ name: username });
  if (existingUser) {
    if (existingUser.password === password) {
      res.redirect("/home");
      console.log("Đăng nhập thành công");
    } else {
      res.send("Mật khẩu không chính xác");
    }
  } else {
    res.send("Người dùng không tồn tại");
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await collection.deleteOne({ _id: userId });
    console.log("Xóa người dùng thành công");
    res.redirect("/home");
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.send("Đã xảy ra lỗi trong quá trình xóa người dùng");
  }
};