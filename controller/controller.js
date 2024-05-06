// controllers/controller.js

const User = require("../model/users");

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
  const user = await User.findOne({ _id: userId });

  if (user) {
    res.render("update", { userId: userId, user: user });
  } else {
    res.send("Không tìm thấy người dùng");
  }
};

// Hiển thị trang chủ
exports.getHomePage = async (req, res) => {
  const users = await User.find();
  res.render("home", { users });
};

// Hiển thị trang xóa người dùng
exports.getDeletePage = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });
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
    password: req.body.password,
    email: req.body.email
  };

  const existingUser = await User.findOne({ name: data.name });
  if (existingUser) {
    res.send("Người dùng đã tồn tại, vui lòng chọn tên khác");
  } else {
    await User.insertMany(data);
    res.redirect("/home");
    console.log("Thêm người dùng thành công");
  }
};
// Hiển thị danh sách người dùng
exports.displayUsers = async (req, res) => {
  const users = await User.find();
  res.render("home", { users });
};

// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = {
    name: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  try {
    await User.updateOne({ _id: userId }, { $set: updatedData });
    console.log("Cập nhật người dùng thành công");
    res.redirect("/home");
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.send("Đã xảy ra lỗi trong quá trình cập nhật người dùng");
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ name: username });
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};
// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.deleteOne({ _id: userId });
    console.log("Xóa người dùng thành công");
    res.redirect("/home");
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.send("Đã xảy ra lỗi trong quá trình xóa người dùng");
  }
};
