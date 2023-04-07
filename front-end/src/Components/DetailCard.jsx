import PropTypes from 'prop-types';

export default function DetailCard({
  index,
  nome,
  quantity,
  unitValue,
  subtotal,
}) {
  return (
    <div
      className="productCard"
    >
      <span
        data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
      >
        {index}

      </span>
      {' '}
      <span
        data-testid={ `customer_order_details__element-order-table-name-${index}` }
      >
        {nome}

      </span>
      {' '}
      <span
        data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
      >
        {quantity}

      </span>
      {' '}
      <span
        data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
      >
        {unitValue}

      </span>
      {' '}
      <span
        data-testid={ `customer_order_details__element-order-total-price-${index}` }
      >
        {subtotal}

      </span>
    </div>
  );
}
DetailCard.propTypes = {
  index: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  unitValue: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired,
};
