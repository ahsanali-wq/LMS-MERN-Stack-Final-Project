const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // Password Hashing
  const newUser = new User({ ...req.body, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User Registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", { expiresIn: '1d' }); // JWT Auth
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
