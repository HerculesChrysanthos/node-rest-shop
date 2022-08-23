const express = require('express');
// const { route } = require('../../app');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: `http://localhost:8080/products/${doc._id}`
                    }
                }
            })
        };
        res.status(200).json(response);
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
        res.status(201).json({
            _id: result._id,
            name: result.name,
            price: res.price,
            request: {
                type: "GET",
                url: `http://localhost:8080/products/${result._id}`
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
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
            res.status(200).json({
                _id: doc._id,
                name: doc.name,
                price: doc.price,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/products/${doc._id}`
                }
            });
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
    

    Product.findOneAndUpdate({ _id: id }, { $set: updateOperations }, { new: true })
    .exec()
    .then(doc => {
        res.status(200).json({
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
                type: "GET",
                url: `http://localhost:8080/products/${doc._id}`
            }
        });
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
        if(result.deletedCount == 0){
            res.status(404).json({
                error: `Product with id ${id} not found.`
            });
        } else {
            res.status(200).json(
                `Product with id ${id} has been deleted.`
            );
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;