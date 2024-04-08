const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Initialize Sequelize avec les informations correctes de votre base de données MySQL
const sequelize = new Sequelize('indus', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Définir le modèle utilisateur
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '+234',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'subscriber',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userAgent: {
    type: DataTypes.JSON, // Sequelize ne prend pas en charge les tableaux, vous pouvez utiliser JSON à la place
    allowNull: false,
    defaultValue: [],
  }
}, {
  timestamps: true,
});

// Hook pour le hachage du mot de passe avant de sauvegarder l'utilisateur
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Syncroniser le modèle avec la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true }); // Ceci synchronisera automatiquement le schéma avec la base de données
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Exporter le modèle User pour l'utiliser dans d'autres parties de l'application
module.exports = User;
