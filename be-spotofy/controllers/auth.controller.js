const user = require("../model/user.model");

exports.register = async (req, res) => {
  try {
    const { email, password, name, date, image, gender } = req.body;

    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordOneCharactersPatter = /[A-Za-z]/;
    const passwordANumberOrSpecialCharacterPatter = /[\d#?!&]/;
    const passwordTenCharactersPatter = /^[A-Za-z\d#?!&]{10,}$/;

    if (!email || !password || !name || !date || !gender) {
      return res
        .status(400)
        .json({ isOk: false, message: "Chưa nhập đủ thông tin!" });
    }
    if (!emailPattern.test(email)) {
      return res
        .status(422)
        .json({ isOk: false, message: "Sai định dạng email!" });
    }
    if (!passwordOneCharactersPatter.test(password)) {
      return res.status(422).json({ isOk: false, checked: false });
    }
    if (!passwordANumberOrSpecialCharacterPatter.test(password)) {
      return res.status(422).json({ isOk: false, checked: false });
    }
    if (!passwordTenCharactersPatter.test(password)) {
      return res.status(422).json({ isOk: false, checked: false });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ isOk: false, message: "Email đã được đăng ký!" });
    }

    const newUser = new user({
      email,
      password,
      name,
      date,
      image,
      gender,
    });

    const result = await newUser.save();
    return res.status(201).json({ isOk: true, data: result });
  } catch (error) {
    return res.status(500).json({ isOk: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.findOne({ email });
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!email || !password) {
      return res
        .status(400)
        .json({ isOk: false, message: "Chưa nhập đủ thông tin đăng nhập" });
    }
    if (!emailPattern.test(email)) {
      return res
        .status(422)
        .json({ isOk: false, message: "Sai định dạng email!" });
    }

    if (userLogin.email === email && userLogin.password === password) {
      return res.status(201).json({ isOk: true, data: userLogin });
    } else {
      return res
        .status(400)
        .json({ isOk: false, message: "Đăng nhập thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ isOk: false, message: error.message });
  }
};
