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
  const ENDPOINT = 'customer/orders';

  useEffect(() => {
    const orders = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      console.log(`localStorage id:${id}`);
      const response = await apiPostGeneric(ENDPOINT, id);
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
      {/* {
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
      } */}

      {/*  <DetailBar /> */}
      {/* <p />
      {isLoading
        ? <h1>is loading..</h1>
        : productDetail.map((product, index) => (
          <DetailCard
            key={ index }
            index={ index + 1 }
            nome={ product.product.name }
            unitValue={ product.product.price.toString().replace('.', ',') }
            quantity={ product.quantity }
            subtotal={
              (product.product.price * product.quantity)
                .toString().replace('.', ',')
            }
          />
        ))}
      <p /> */}
      {/* <div>
        Total: R$
        <span data-testid="customer_order_details__element-order-total-price">
          {totalValueDetails.toString().replace('.', ',')}
        </span>
      </div> */}
    </div>
  );
}
