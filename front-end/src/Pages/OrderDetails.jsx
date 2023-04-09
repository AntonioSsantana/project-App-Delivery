import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../Components/navBar';
import apiPostGeneric from '../Helpers/apiPostGeneric';
import apiCallGeneric from '../Helpers/apiGeneric';
import ProductDetail from '../Components/ProductDetail';

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
  console.log(order);

  return (
    <div>
      <NavBar nome={ userName } />
      <main>
        <h1>Detalhe do Pedido</h1>
        { isLoading ? <h1>Carregando...</h1> : <ProductDetail order={ order } /> }
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
