const express = require('express');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware do weryfikacji JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('Brak tokenu');
    return res.status(401).json({ message: 'Brak tokenu' });
  }

  console.log('Token received:', token); 

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT error:', err); 
      return res.status(403).json({ message: 'Nieprawidłowy token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Dodawanie transakcji
router.post('/', verifyToken, async (req, res) => {
  const { pairName, transactionDate, comment, screenshotUrl } = req.body;
  try {
    const newTransaction = new Transaction({
      pairName,
      transactionDate,
      comment,
      screenshotUrl,
      user: req.userId,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Błąd podczas dodawania transakcji:', err); 
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

// Pobieranie transakcji użytkownika
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });
    res.json(transactions);
  } catch (err) {
    console.error('Błąd podczas pobierania transakcji:', err); 
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;
