import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function NavBar({ nome }) {
  const history = useHistory();

  const redirect = (event) => {
    switch (event.target.name) {
    case 'products':
      history.push('/customer/products');
      break;
    case 'orders':
      history.push('/customer/orders');
      break;
    case 'logout':
      history.push('/login');
      localStorage.clear();
      break;
    default:
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div className="navBarContainer">
      <div>

        <button
          data-testid="customer_products__element-navbar-link-products"
          onClick={ (e) => redirect(e) }
          type="button"
          name="products"
        >
          produtos
        </button>
      </div>
      <div>
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ (e) => redirect(e) }
          name="orders"
        >
          meus pedidos
        </button>
      </div>
      <div>
        <h4 data-testid="customer_products__element-navbar-user-full-name">{nome}</h4>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          name="logout"
          onClick={ (e) => redirect(e) }
        >
          sair
        </button>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  nome: PropTypes.string.isRequired,
};
