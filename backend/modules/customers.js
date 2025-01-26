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
      totalAmount:{
        type:DataTypes.FLOAT,
        allowNull:true
      },
      creditAmount:{
        type:DataTypes.FLOAT,
        allowNull:true
      },
      pendingAmount:{
        type:DataTypes.FLOAT,
        allowNull:true
      }

})

module.exports=Customers;