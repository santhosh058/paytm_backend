const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Wallet = require('../models/wallet.model');
const generateToken = require('../utils/generateToken'); // ✅ Use the utility

exports.registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  await Wallet.create({ user: user._id }); // ✅ Automatically create wallet

  const token = generateToken(user._id); // ✅ Use utility here

  return { user, token };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user._id); // ✅ Use utility here

  return { user, token };
};
