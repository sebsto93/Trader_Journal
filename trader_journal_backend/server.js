const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.log('Błąd połączenia z MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});