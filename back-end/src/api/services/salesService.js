const { Sale } = require('../../database/models');
const { User } = require('../../database/models');

const getAllSales = async () => {
    const product = await Sale.findAll();
  return product;
};

const getSaleById = async (id) => {
  const sale = await Sale.findOne({
    include: { model: User, as: 'seller' },
    attributes: [
      'id',
      'status',
      'saleDate',
      'totalPrice',
    ],
    where: { id },
  });
  return sale;
};

const createSale = async (saleData) => {
  const sale = await Sale.create(saleData);
  return { sale };
};

const getSalesByUserId = async (id) => {
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
    getSalesByUserId,
    getSaleById,
  };