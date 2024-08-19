const {DataTypes}=require("sequelize")
const sequelize=require("../db")

const contactForm= sequelize.define('contactForm',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
    allowNull:false,
    validate:{
        isEmail:true
    },
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isNumeric:true
        }
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

module.exports=contactForm;