const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Test ok!"})});

// Rejestracja
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Rejestracja - otrzymane dane:", email, password);
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Użytkownik już istnieje' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera' });
    }
});


// Logowanie
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Nieprawidłowe hasło' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Błąd serwera', error: err.message });
    }
});

module.exports = router;
