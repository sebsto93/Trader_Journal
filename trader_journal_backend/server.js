const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Trasy
app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Dziennik Tradera Backend działa!');
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Test ok!"})
});

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.log('Błąd połączenia z MongoDB:', err));

// Dopiero na końcu uruchamiamy serwer
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
