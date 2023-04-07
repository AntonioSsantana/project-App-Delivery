const { Sale } = require('../../database/models');

const getAllSales = async () => {
    const product = await Sale.findAll();
  return product;
};

const createSale = async (saleData) => {
  const sale = await Sale.create(saleData);
  return { sale };
};

const getSalesById = async (id) => {
  const sales = await Sale.findAll({
    attributes: [
      'id',
      'status',
      'saleDate',
      'totalPrice',
    ],
    where: { userId: id },
  });
  return sales;
};

module.exports = {
    getAllSales,
    createSale,
    getSalesById,
  };