import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/navBar';
import ProductCard from '../Components/ProductCard';
import apiCallGeneric from '../Helpers/apiGeneric';
import apiPostGeneric from '../Helpers/apiPostGeneric';

export default function Products() {
  const history = useHistory();

  const data = [
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
    {
      quantity: 0,
    },
  ];

  const [productsArr, setproductsArr] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [userName, setuserName] = useState('');
  const [state, setState] = useState(data);
  const [checkoutValue, setcheckoutValue] = useState('0');

  useEffect(() => {
    const products = async () => {
      const response = await apiCallGeneric('products');
      setproductsArr(response);
      setState(response);
    };
    setisLoading(false);
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
    products();
    validateUsers();
  }, [history]);

  const sum = (e, i) => {
    const { value, name } = e.target;
    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: (Number(value) + 1) < 0 ? 0 : (Number(value) + 1),
    };
    setState(newState);

    // Carrinho
    let price = 0;
    newState.forEach((objectQty, index) => {
      if (objectQty.quantity) {
        price += objectQty.quantity * productsArr[index].price;
      }
    });
    const finalPrice = price.toFixed(2).toString().replace('.', ',');
    setcheckoutValue(finalPrice);
  };

  const subtract = (e, i) => {
    const { value, name } = e.target;
    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: (Number(value) - 1) < 0 ? 0 : (Number(value) - 1),
    };
    setState(newState);

    // Carrinho
    let price = 0;
    newState.forEach((objectQty, index) => {
      if (objectQty.quantity) {
        price -= objectQty.quantity * productsArr[index].price;
      }
    });
    Math.abs(price);
    // *****
    const finalPrice = price.toFixed(2).replace('.', ',');
    setcheckoutValue(finalPrice);
  };

  const handleChange = (e, i) => {
    const { value, name } = e.target;
    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: Number(value) < 0 ? 0 : Number(value),
    };
    setState(newState);

    // Carrinho
    let price = 0;
    newState.forEach((objectQty, index) => {
      console.log(objectQty.quantity);
      price += +(objectQty.quantity || 0) * +productsArr[index].price;
    });
    const finalPrice = price.toFixed(2).toString().replace('.', ',');
    setcheckoutValue(finalPrice);
  };
  const redirectCheckout = () => {
    history.push('/customer/checkout');
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) {
      const newCart = [...state];
      const filteredCart = newCart.filter((i) => i.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
    }

    if (cart) {
      const oldCart = JSON.parse(localStorage.getItem('cart'));
      const newCart = [...oldCart, state];

      const filteredCart = newCart.filter((i) => i.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
    }
  };

  return (
    <div className="cardContainer">
      <NavBar nome={ userName } />
      {isLoading
        ? <h1>is loading..</h1>
        : productsArr.map((product, index) => (
          <ProductCard
            id={ product.id }
            key={ index }
            value={ state[index].quantity }
            name={ product.name }
            price={ product.price.toString().replace('.', ',') }
            url={ product.url_image }
            sum={ (e) => sum(e, index) }
            subtract={ (e) => subtract(e, index) }
            onChange={ (e) => handleChange(e, index) }
          />
        ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => redirectCheckout() }
        disabled={ checkoutValue === '0' }
      >
        <div>
          Ver Carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            { checkoutValue }
          </span>
        </div>
      </button>
    </div>
  );
}
