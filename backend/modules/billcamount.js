const CREDITA = sequelize.define('CREDITA', {
  billId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creditAmount: {
    type: DataTypes.JSON, // e.g. [{ date: "2025-07-18", amount: 2000 }]
    allowNull: false
  }
});

module.exports=CREDITA;