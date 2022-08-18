const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Ok, post products',
            product: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});

router.get('/:productId', (req, res , next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid entry found for given id.'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error: err});
    });
});

router.patch('/:productId', (req, res , next) => {
    const id = req.params.productId;
    const updateOperations = {};

    for(const operation of req.body){
        updateOperations[operation.propName] = operation.value;
    }
    

    Product.findOneAndUpdate({ _id: id }, { $set: updateOperations })
    .exec()
    .then(result => {
        console.log(result);

        res.status(200).json(result);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });


});

router.delete('/:productId', (req, res , next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error: err});
    });
});

module.exports = router;