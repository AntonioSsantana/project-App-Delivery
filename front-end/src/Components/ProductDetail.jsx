import PropTypes from 'prop-types';
import moment from 'moment';
import DetailBar from './DetailBar';
import DetailCard from './DetailCard';

export default function ProductDetail({
  order,
}) {
  const { id, sellerId, saleDate, status, totalPrice } = order;
  const futuroArray = ['O', 'flamengo', 'não', 'é', 'time', '...'];
  return (
    <section>
      <DetailBar
        id={ id }
        seller={ sellerId }
        date={ moment(saleDate).format('DD/MM/YYYY') }
        status={ status }
      />
      {futuroArray.map((item) => (
        <DetailCard
          key={ item }
          index={ item }
          nome={ item }
          quantity={ item }
          unitValue={ item }
          subtotal={ item }
        />
      ))}
      <p data-testid="customer_order_details__element-order-total-price">
        Total: R$
        {totalPrice/* .replace('.', ',') */}
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
