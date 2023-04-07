import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import NavBar from '../Components/navBar';
import apiPostGeneric from '../Helpers/apiPostGeneric';
import apiCallGeneric from '../Helpers/apiGeneric';
/* import DetailCard from '../Components/DetailCard'; */
import DetailBar from '../Components/DetailBar';

export default function OrderDetails({ match: { params: { id } } }) {
  const [userName, setuserName] = useState('');
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('user'));
    const orderDetails = async () => {
      const response = await apiCallGeneric(`customer/orders/${id}`);
      setOrder(response);
      setIsLoading(false);
    };

    const validateUsers = async () => {
      if (JSON.parse(localStorage.getItem('user')) !== null) {
        const response = await apiPostGeneric('validateUsers', { token });
        setuserName(name);
        if (!response) {
          history.push('/login');
        }
      }
    };
    validateUsers();
    orderDetails();
  }, [history, id]);

  return (
    <div>
      <NavBar nome={ userName } />
      <main>
        <h1>Detalhe do Pedido</h1>
        { isLoading
          ? <h1>Carregando</h1>
          : (
            <section>
              <DetailBar
                id={ order.id }
                seller={ order.sellerId }
                date={ moment(order.saleDate).format('DD/MM/YYYY') }
                status={ order.status }
              />
              <p data-testid="customer_order_details__element-order-total-price">
                Total: R$
                {order.totalPrice.replace('.', ',')}
              </p>
            </section>
          )}
      </main>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
