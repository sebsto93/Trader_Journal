const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    pairName: { type: String, required: true },
    transactionDate: { type: String, required: true },
    comment: { type: String },
    screenshotUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.export = Transaction;