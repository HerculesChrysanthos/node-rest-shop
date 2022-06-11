const express = require('express');
const { route } = require('../../app');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Ok, get products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Ok, post products'
    });
});

router.get('/:productId', (req, res , next) => {
    const id = req.params.productId;
    if( id === 'special'){
        res.status(200).json({
            message: 'Ok, found id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You gave an id'
        });
    }
});

router.patch('/:productId', (req, res , next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: `Updated product with id ${id}`
    });
});

router.delete('/:productId', (req, res , next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: `Deleted product with id ${id}`
    });
});

module.exports = router;