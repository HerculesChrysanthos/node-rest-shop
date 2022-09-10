const express = require('express');
// const { route } = require('../../app');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.getOrders);

router.post('/', checkAuth, OrdersController.createOrder);

router.get('/:orderId', checkAuth, OrdersController.getOrderById);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrderById);

module.exports = router;