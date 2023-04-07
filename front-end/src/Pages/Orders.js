import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment/moment';
import NavBar from '../Components/navBar';
import apiPostGeneric from '../Helpers/apiPostGeneric';
import CustomerOrder from '../Components/CustomerOrder';

export default function Order() {
  const [userName, setuserName] = useState('');
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const { id, token, name } = JSON.parse(localStorage.getItem('user'));
    const orders = async () => {
      const response = await apiPostGeneric('customer/orders', { id });
      setOrdersList(response);
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
    orders();
  }, [history]);

  return (
    <div>
      <NavBar nome={ userName } />
      {
        isLoading
          ? <h1>is loading..</h1>
          : ordersList.map(({ id, status, saleDate, totalPrice }) => (
            <CustomerOrder
              key={ id }
              id={ id }
              status={ status }
              date={ moment(saleDate).format('DD/MM/YYYY') }
              subtotal={ totalPrice.replace('.', ',') }
            />
          ))
      }
      { !isLoading && ordersList.length === 0
        ? <h1>Você ainda não fez nenhum pedido :(</h1>
        : null }
    </div>
  );
}
