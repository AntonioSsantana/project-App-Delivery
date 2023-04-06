const express = require('express');
const { getAllsales,
    createSaleHandler,
    getAllById,
 } = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/sales', getAllsales)
.post('/sales', createSaleHandler);

salesRouter.post('/customer/orders', getAllById);
module.exports = salesRouter;
