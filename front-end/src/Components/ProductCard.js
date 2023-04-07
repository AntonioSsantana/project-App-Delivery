import PropTypes from 'prop-types';

export default function ProductCard({
  id, name, price, url, sum, subtract, onChange, value,
}) {
  return (
    <div
      className="productCard"
    >
      <h4
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </h4>
      <h4
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price}

      </h4>
      <img
        src={ url }
        alt="img"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        width="100px"
      />
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          name="quantity"
          value={ value }
          onClick={ subtract }
        >
          -
        </button>

        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name="quantity"
          value={ value }
          onChange={ onChange }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          name="quantity"
          value={ value }
          onClick={ sum }
        >
          +
        </button>
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  sum: PropTypes.func.isRequired,
  subtract: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
