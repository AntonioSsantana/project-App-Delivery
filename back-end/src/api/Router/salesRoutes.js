const express = require('express');
const { getAllsales,
    createSaleHandler,
    getAllById,
 } = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/customer/orders', getAllById);
salesRouter.get('/sales', getAllsales);
salesRouter.post('/sales', createSaleHandler);

module.exports = salesRouter;
