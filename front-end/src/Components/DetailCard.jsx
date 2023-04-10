import PropTypes from 'prop-types';

export default function DetailCard({
  index,
  nome,
  quantity,
  unitValue,
  subtotal,
}) {
  const element = 'customer_order_details__element-';
  const indexId = `${element}order-table-item-number-${index}`;
  const nameId = `${element}order-table-name-${index}`;
  const quantityId = `${element}order-table-quantity-${index}`;
  const unitValueId = `${element}order-table-sub-total-${index}`;
  const subtotalId = `${element}order-total-price-${index}`;
  return (
    <div className="productCard">
      <p data-testid={ indexId }>
        {index}
      </p>
      <p data-testid={ nameId }>
        {nome}
      </p>
      <p data-testid={ quantityId }>
        {quantity}
      </p>
      <p data-testid={ unitValueId }>
        {unitValue}
      </p>
      <p data-testid={ subtotalId }>
        {subtotal.toFixed(2)}
      </p>
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
