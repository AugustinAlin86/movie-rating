const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Admin login attempt:', email);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin does not exist');
      return res.status(400).json({ message: 'Admin does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, admin: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// User signup
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', email);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, role: 'user' });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Admin signup
exports.adminSignup = async (req, res) => {
  const { email, password } = req.body;
  console.log('Admin signup attempt:', email);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ email, password: hashedPassword, role: 'admin' });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin signup successful' });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
