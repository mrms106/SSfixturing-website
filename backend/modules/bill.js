const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bills=sequelize.define('BILLS',{
    cname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    caddreass:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cgst:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cmail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cContact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    serialNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    invoiceNo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    PoNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    invoicedate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Podate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hsn:{
        type:DataTypes.STRING,
        allowNull:false
    },
    unitRate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Qty:{
        type:DataTypes.STRING,
        allowNull:false
    },
    UOM:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tax:{
        type:DataTypes.STRING,
        allowNull:false
    },
    disc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    totalAmount:{
        type:DataTypes.STRING,
        allowNull:false
    },
    taxamount:{
        type:DataTypes.STRING,
        allowNull:false
    },
    grandTotal:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=Bills;