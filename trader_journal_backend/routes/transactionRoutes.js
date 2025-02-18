const express = require('express');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware do weryfikacji JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Brak tokenu' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Nieprawidłowy token' });
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
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

// Pobieranie transakcji użytkownika
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;
