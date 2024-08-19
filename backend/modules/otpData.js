const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const OTP = sequelize.define('OTP', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otpcode: {
    type: DataTypes.STRING(6),  
    allowNull: false,
  },
  expiresat: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,  // This will automatically add `createdAt` and `updatedAt` fields
  createdAt: 'created_at',  // Rename createdAt to created_at
  updatedAt: false,  // Disable the updatedAt field as it's not needed
});

module.exports = OTP;
