const express = require('express');
const router = express.Router(); 
const Customers = require('../models/customer');

//get the cutomer details saved in database
router.route('/').get((req,res)=>{
    Customers.find()
        .then(customers=> res.json(customers))
        .catch(err=>res.status(400).json('Error:'+err));
});

//find customer details by id
router.route('/:id').get((req,res)=>{
    Customers.findById(req.params.id)
        .then(customer=> res.json(customer))
        .catch(err=>res.status(400).json('Error:'+err));
});

//update the data by id 
router.route('/update/:id').post((req,res)=>{
    Customers.findById(req.params.id)
        .then(customer=>{
            customer.customerId = Number(req.body.customerId);
            customer.firstname = req.body.firstname;
            customer.lastname = req.body.lastname;
            customer.balance = Number(req.body.balance);
            customer.email = req.body.email;
            customer.save()
                .then(()=>res.json('cutomer database updated'))
                .catch(err=>res.status(400).json('Error:'+err));
        })
        .catch(err=>res.status(400).json('Error:'+err));
});

//add customers
router.route('/add').post((req,res)=>{
    const customerId = req.body.customerId;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const balance = req.body.balance;
    const email = req.body.email;
    const newcustomer = new Customers({
        customerId,
        firstname,
        lastname,
        balance,
        email
    })
    newcustomer.save()
         .then(()=>res.json('customer added'))
         .catch(err=>res.status(400).json('Error:'+err));   
});



module.exports = router;