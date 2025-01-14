const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Customers=sequelize.define('CUSTOMERS',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gstNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    serialNO: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },

})

module.exports=Customers;