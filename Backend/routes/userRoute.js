const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

// Registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // IF USER EXISTS
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // CREATE USER
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // IF USER EXISTS
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = userRoute;