const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.getOrders = (req, res, next) => {
    Order.find()
    .select("product quantity _id")
    .populate('product')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: `http://localhost:8080/orders/${doc._id}`
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

};

exports.createOrder = (req, res, next)  => {
    console.log(req.body.productId)
    Product.findById(req.body.productId)
    .exec()
    .then(product => {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
    
        order
        .save()
        .then(result => {
            res.status(201).json({
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/orders/${result._id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    })
    .catch(error => {
        res.status(404).json({
            erorr: 'Product not found.' 
        })
    });
};

exports.getOrderById = (req, res, next)  => {
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json({
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/orders/${doc._id}`
                }
            });
        } else {
            res.status(404).json({ 
                message: 'No valid entry found for given id.'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.deleteOrderById = (req, res , next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id })
    .exec()
    .then(result => {
        if(result.deletedCount == 0){
            res.status(404).json({
                error: `Order with id ${id} not found.`
            });
        } else {
            res.status(200).json({
                message: `Order with id ${id} has been deleted.`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};