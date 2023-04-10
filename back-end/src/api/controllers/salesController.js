const { getCurrentDateTime } = require('../utils/currentTime');

const {
  getAllSales,
  createSale,
  getSalesByUserId,
  getSaleById,
} = require('../services/salesService');
const { createSaleProduct, getByOrderId } = require('../services/productSaleService');

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await getByOrderId(id);
  const sale = await getSaleById(id);
  res.status(200).json([sale, ...response]);
};
const getAllByUserId = async (req, res) => {
  const { id } = req.body;
  const response = await getSalesByUserId(id);
  res.status(200).json(response);
};
const getAllsales = async (req, res) => {
    try {
        const sales = await getAllSales();
   return res.status(200).json(sales);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
  };
  const createSaleHandler = async (req, res) => {
    try {
      const { 
        userId, sellerId, totalPrice, deliveryAddress, 
        deliveryNumber, status } = req.body[0];
        const saleDate = getCurrentDateTime();
        const { sale } = await createSale({
          userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
          const newArr = req.body.slice(1).map(({ productId, quantity }) => ({
            saleId: sale.id, productId, quantity,
          }));
      await createSaleProduct(newArr);
       return res.status(201).json({ id: sale.id });
    } catch (error) {
     return res.status(400).json({ error: error.message }); 
}
    };
  module.exports = {
    getAllsales,
    createSaleHandler,
    getAllByUserId,
    getById,
  };
