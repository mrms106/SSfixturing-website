const customer=require('../modules/customers')

module.exports.showCustomers=async(req,res)=>{
    try{
        const allCustomers=await customer.findAll({})
        if(!allCustomers){
            res.status(401).json('customers is not found')
        }
        res.status(200).json({message:"All customers fetched successfull",customers:allCustomers})
    }catch(err){
        console.log(err)
        res.status(500).json('internal server Error',err)
    }
}

module.exports.showonecustomer=async(req,res)=>{
    const { serialNo } = req.params;
    try{
        const onecustomer=await customer.findOne({where:{serialNo}});
        if(!onecustomer){
            res.status(404).send('the customer is not found in database')
        }
        res.status(200).json({message:"customer fetched succefull",customer:onecustomer})
    }catch(err){
        console.log('error in find a customer',err)
        res.status(500).send('internal server error',err)
    }
}

function generateSerialNumber() {
    return Math.random().toString().slice(2, 20);
  }

module.exports.addcustomer=async(req,res)=>{
    const {name,address,gstNo,email,contact}=req.body
    const serialNO=generateSerialNumber()

    try{
        await customer.create({
            name:name,
            address:address,
            gstNo:gstNo,
            email:email,
            contact:contact,
            serialNO:serialNO
        });
        res.status(200).send('the customer is created successfully')
    }catch(err){
        console.log(err);
        res.status(500).send('internal server error')
    }

}

module.exports.deletecustomer = async (req, res) => {
    const { serialNo } = req.params;
    try {
        const deleteCustomer = await customer.destroy({ where: { serialNo } });

        // If no rows were affected, it means no customer was deleted (customer not found)
        if (deleteCustomer === 0) {
            return res.status(404).send('Customer not found in the database');
        }

        res.status(200).send('Customer deleted successfully');
    } catch (err) {
        console.log('Error in deleting customer', err);
        res.status(500).send('Internal server error');
    }
};

module.exports.updateCustomer = async (req, res) => {
    const { serialNo } = req.params;
    const { name, address, gstNo, email, contact } = req.body;  // Destructure the updated fields from the body
    
    try {
        // Find the customer with the matching serialNo
        const customerToUpdate = await customer.findOne({ where: { serialNo } });

        // If no customer found with the given serialNo
        if (!customerToUpdate) {
            return res.status(404).send('Customer not found in the database');
        }

        // Update the customer with the new values
        await customer.update(
            { name, address, gstNo, email, contact },  // Updated fields
            { where: { serialNo } }   // Just update based on serialNo
        );

        res.status(200).send('Customer updated successfully');

    } catch (err) {
        console.log('Error in updating customer', err);
        res.status(500).send('Internal server error');
    }
};

// update the amount column

module.exports.updateAmounts=async(req,res)=>{
    const {serialNo}=req.params;
    const {totalAmount,creditAmount,pendingAmount}=req.body;
    try{
        const onecustomer=await customer.update(
            {totalAmount,creditAmount,pendingAmount},
            {where :{serialNo}}
        );
        if (onecustomer[0] === 0) {
            return res.status(404).json({ message: 'Bill not found' });
          }
      
          res.status(200).json({ message: 'Credited amount updated successfully' });
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Failed to update credited amount', err });
    }
}