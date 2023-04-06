import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function CustomerOrder({
  id,
  status,
  data,
  subtotal,
}) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <p
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {id}

      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}

      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        {data}

      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        {`R$ ${subtotal}`}

      </p>
    </button>
  );
}

CustomerOrder.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  subtotal: PropTypes.string.isRequired,
};
