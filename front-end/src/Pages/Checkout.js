import React, { useContext, useEffect } from 'react';
import NavBar from '../Components/navBar';
import Table from '../Components/Table';
import MyContext from '../Context/MyContext';

function Checkout() {
  const { totalPrice, setTotalPrice, cart, setCart } = useContext(MyContext);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')));
  }, [setCart]);

  useEffect(() => {
    const sumPrice = cart.reduce((acc, item) => {
      if (item.quantity) {
        acc += item.quantity * item.price;
      }
      return acc;
    }, 0);
    setTotalPrice(sumPrice.toFixed(2).replace('.', ','));
  }, [cart, setTotalPrice]);

  return (
    <>
      <NavBar />
      <div>
        <h2>Finalizar pedido</h2>
        <Table />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { totalPrice }
        </span>
      </div>
    </>
  );
}

export default Checkout;
