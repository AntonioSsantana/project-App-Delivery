const express = require('express');
const { getAllsales,
    createSaleHandler,
    getAllByUserId,
    getById,
 } = require('../controllers/salesController');

const salesRouter = express.Router();
// -----------------------------------------------------
salesRouter.get('/customer/orders/:id', getById);
// -----------------------------------------------------
salesRouter.post('/customer/orders', getAllByUserId);
salesRouter.get('/sales', getAllsales);
salesRouter.post('/sales', createSaleHandler);

module.exports = salesRouter;
