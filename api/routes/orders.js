const express = require('express');
// const { route } = require('../../app');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Ok, get orders.'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Ok, order created.',
        order: order
    });
});

router.get('/:orderId', (req, res , next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Ok, found order'
    });
});

router.delete('/:orderId', (req, res , next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: `Deleted order with id ${id}`
    });
});

module.exports = router;