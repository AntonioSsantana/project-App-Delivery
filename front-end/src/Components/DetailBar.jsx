import PropTypes from 'prop-types';

export default function DetailBar({
  id,
  seller,
  date,
  status,
}) {
  const customer = 'customer_order_details__';
  const orderId = `${customer}element-order-details-label-order-id`;
  const sellerId = `${customer}element-order-details-label-seller-name`;
  const dateId = `${customer}element-order-details-label-order-date`;
  const statusId = `${customer}element-order-details-label-delivery-status`;
  const buttonId = `${customer}button-delivery-check`;
  return (
    <div className="navBarContainer">
      <p data-testid={ orderId }>
        Pedido
        {id}
      </p>
      <p data-testid={ sellerId }>
        {seller}
      </p>
      <p data-testid={ dateId }>
        {date}
      </p>
      <p data-testid={ statusId }>
        {status}
      </p>
      <button type="button" data-testid={ buttonId } disabled>
        marcar como entregue
      </button>
    </div>
  );
}

DetailBar.propTypes = {
  id: PropTypes.number.isRequired,
  seller: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,

};
