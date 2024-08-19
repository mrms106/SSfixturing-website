const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PDF = sequelize.define('PDF', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  contentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNO: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

module.exports = PDF;
