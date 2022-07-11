import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const produto = await getProductId(id);
    this.setState({
      product: produto,
    });
  }

  handleClick = () => {
    const { product } = this.state;
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage === null) {
      const item = {
        nome: product.title,
        preco: product.price,
      };

      localStorage.setItem('cart', JSON.stringify([item]));
    } else {
      const item = {
        nome: product.title,
        preco: product.price,
      };

      storage.push(item);
      localStorage.setItem('cart', JSON.stringify(storage));
    }
  }

  render() {
    const { product } = this.state;
    const { title, thumbnail, price, warranty } = product;
    return (
      <div data-testid="product-detail-link">
        <Link id="teste02" to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <p id="img8" data-testid="product-detail-name">
          { title }
        </p>
        <p>
          { price }
        </p>
        <img id="img1" src={ thumbnail } alt={ title } />
        <p>{ warranty }</p>
        <button
          id="teste05"
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Product;
