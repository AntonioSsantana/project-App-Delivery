import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/navBar';
import apiPostGeneric from '../Helpers/apiPostGeneric';
import CustomerOrder from '../Components/CustomerOrder';

export default function Order() {
  const [userName, setuserName] = useState('');
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const orders = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      console.log(`localStorage id:${id}`);
      const response = await apiPostGeneric('customer/orders', { id });
      console.log(response);
      setOrdersList(response);
      setIsLoading(false);
    };

    const validateUsers = async () => {
      if (JSON.parse(localStorage.getItem('user')) !== null) {
        const { token, name } = JSON.parse(localStorage.getItem('user'));
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
      <p />
      {
        isLoading
          ? <h1>is loading..</h1>
          : ordersList.map(({ id, status, saleDate, totalPrice }) => (
            <CustomerOrder
              key={ id }
              id={ id }
              status={ status }
              data={ saleDate }
              subtotal={ totalPrice }
            />
          ))
      }
    </div>
  );
}
