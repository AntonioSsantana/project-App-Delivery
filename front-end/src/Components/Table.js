import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import apiPOSTCheckout from '../Helpers/apiPOSTCheckout';

function Table() {
  const DATA_TESTID = 'customer_checkout__element-order-table-';
  const history = useHistory();

  const { cart, setCart, totalPrice } = useContext(MyContext);
  const [deliveryAddress, setDeliveryAdress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    setCart(items);
  }, []);

  const removeItem = (id) => {
    const item = cart.filter((i) => +i.id !== +id);
    setCart(item);
  };

  const finishOrder = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token || [];
    console.log(token);
    const finished = {
      userId: 3,
      sellerId: 2,
      totalPrice: totalPrice.replace(',', '.'),
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
    };
    const { id } = await apiPOSTCheckout('sales', finished, token);
    history.push(`/customer/orders/${id}`);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((products, index) => (
              <tr key={ products.id }>
                <th
                  data-testid={ `${DATA_TESTID}item-number-${index}` }
                >
                  {index + 1}
                </th>
                <th
                  data-testid={ `${DATA_TESTID}name-${index}` }
                >
                  {products.name}
                </th>
                <th
                  data-testid={ `${DATA_TESTID}quantity-${index}` }
                >
                  {products.quantity}
                </th>
                <th
                  data-testid={ `${DATA_TESTID}unit-price-${index}` }
                >
                  {`${products.price.toString().replace('.', ',')}`}
                </th>
                <th
                  data-testid={ `${DATA_TESTID}sub-total-${index}` }
                >
                  {`${(products.price * products.quantity).toFixed(2)
                    .toString().replace('.', ',')}`}
                </th>
                <th>
                  <button
                    type="button"
                    data-testid={ `${DATA_TESTID}remove-${index}` }
                    onClick={ () => removeItem(products.id) }
                  >
                    Remover item
                  </button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <h2>Detalhes e endereço para a entrega</h2>
        <label htmlFor="seller">
          <span>P. Vendedor responsável:</span>
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
          >
            <option>Fulano</option>
            <option>Ciclano</option>
            <option>Beltrano</option>
          </select>
        </label>
        <span>Endereço</span>
        <input
          type="text"
          id="address"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          onChange={ ({ target: { value } }) => setDeliveryAdress(value) }
        />
        <span>Número</span>
        <input
          type="text"
          id="number"
          data-testid="customer_checkout__input-address-number"
          value={ deliveryNumber }
          onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ finishOrder }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </>
  );
}

export default Table;
