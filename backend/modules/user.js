const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const passportLocalSequelize = require('passport-local-sequelize');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.STRING(5024),  // Adjust the length as needed
  },
  salt: {
    type: DataTypes.STRING(5024),  // Adjust the length as needed
  },
});

passportLocalSequelize.attachToUser(User, {
  usernameField: 'username',
  hashField: 'hash',
  saltField: 'salt',
});

module.exports = User;
