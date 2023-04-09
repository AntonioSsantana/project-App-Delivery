import PropTypes from 'prop-types';
import moment from 'moment';
import DetailBar from './DetailBar';
import DetailCard from './DetailCard';

export default function ProductDetail({
  order,
}) {
  const { id, seller, saleDate, status, totalPrice } = order[0];
  return (
    <section>
      <DetailBar
        id={ id }
        seller={ seller.name }
        date={ moment(saleDate).format('DD/MM/YYYY') }
        status={ status }
      />
      {order.slice(1).map(({ Product: { name, price }, quantity }, index) => (
        <DetailCard
          key={ index }
          index={ index + 1 }
          nome={ name }
          quantity={ quantity }
          unitValue={ price }
          subtotal={ price * quantity }
        />
      ))}
      <p data-testid="customer_order_details__element-order-total-price">
        {totalPrice.replace('.', ',')}
      </p>
    </section>
  );
}

ProductDetail.propTypes = {
  order: PropTypes.shape([{
    id: PropTypes.number.isRequired,
    sellerId: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
  }]).isRequired,
};
