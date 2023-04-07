import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function CustomerOrder({
  id,
  status,
  date,
  subtotal,
}) {
  const history = useHistory();
  const orderId = `customer_orders__element-order-id-${id}`;
  const statusId = `customer_orders__element-delivery-status-${id}`;
  const dateId = `customer_orders__element-order-date-${id}`;
  const subtotalId = `customer_orders__element-card-price-${id}`;
  return (
    <button
      type="button"
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <label htmlFor="order">
        <small>Pedido</small>
        <p name="order" data-testid={ orderId }>
          {id}
        </p>
      </label>
      <p data-testid={ statusId }>
        {status}
      </p>
      <p data-testid={ dateId }>
        {date}
      </p>
      <p data-testid={ subtotalId }>
        {`R$ ${subtotal}`}
      </p>
    </button>
  );
}

CustomerOrder.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  subtotal: PropTypes.string.isRequired,
};
