const { SalesProduct } = require('../../database/models');
const { Product } = require('../../database/models');

const createSaleProduct = async (saleData) => {
    const saleproduct = await SalesProduct.bulkCreate(saleData);
    return { saleproduct };
  };

  const getByOrderId = async (id) => {
    const sale = await SalesProduct.findAll({
      include: { model: Product },
      where: { saleId: id },
    });
    return sale;
  };

  module.exports = {
    createSaleProduct,
    getByOrderId,
  };