
// Import des modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler'); // Import de errorHandler
const mysql = require('mysql');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "https://accounts.google.com/gsi/client"],
  credentials: true,
}));

// Routes
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
})
app.post( '/add', ()=>{
  console.log('add work');
})

// Error Handler Middleware
app.use(errorHandler); // Utilisation de errorHandler

// Connexion à MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Utilisation de la connexion MySQL dans l'application Express
app.use((req, res, next) => {
  req.mysql = connection;
  next();
});

const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = app;
