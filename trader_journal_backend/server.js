const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
 })
  .then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.log('Błąd połączenia z MongoDB:', err));


app.get('/', (req, res) => {
  res.send('Dziennik Tradera Backend działa!');
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});



