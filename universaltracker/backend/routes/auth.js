import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exist' });

    user = new User({ email, password });
    await user.save();

    // Vytvorenie tokenu
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Odošleme token + userId pre automatické prihlásenie
    res.status(201).json({
      message: 'Registration successful',
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Fail' });
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Incorrect email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect email or password' });

    // JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Vrátime token + userId
    res.json({
      token,
      userId: user._id,
      message: 'Login successful'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Fail' });
  }
});

export default router;
