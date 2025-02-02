const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bills = sequelize.define('BILLS', {
  cname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cgst: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cContact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serialNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoiceNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  PoNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoicedate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Podate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item: {
    type: DataTypes.JSON,
    allowNull: false
  },
  totalvalue: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  taxamount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  grandTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isOutside:{
    type:DataTypes.BOOLEAN,
    allowNull:true
  },
  billId:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  creditedAmount:{
    type:DataTypes.FLOAT,
    allowNull:true
  }
}, {
  hooks: {
    beforeValidate: (bill) => {
      // Calculate `totalAmount` for each item and sum `totalValue`
      let totalValue = 0;

      if (bill.item && Array.isArray(bill.item)) {
        bill.item = bill.item.map(currentItem => {
          const totalAmount = parseFloat(currentItem.totalAmount) || 0;


          // Add to totalValue
          totalValue += totalAmount;

          return currentItem; // Return the modified item
        });
      }

      bill.totalvalue = totalValue;

      // Calculate tax amount (18% of totalValue)
      const taxAmount = totalValue * 0.18;
      bill.taxamount = taxAmount;

      // Calculate grand total (totalValue + taxAmount)
      bill.grandTotal = totalValue + taxAmount;
    }
  }
});

module.exports = Bills;
