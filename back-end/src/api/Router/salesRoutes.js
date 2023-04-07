const express = require('express');
const { getAllsales,
    createSaleHandler,
 } = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/sales', getAllsales);
salesRouter.post('/sales', createSaleHandler);
module.exports = salesRouter;
