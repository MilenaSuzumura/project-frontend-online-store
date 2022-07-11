import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  sendInformation = () => {
    const { product, handleClick } = this.props;
    handleClick(product.title, product.price);
  };

  render() {
    const { product } = this.props;
    return (
      <div id="teste03" data-testid="product">
        <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
          <p>{product.title}</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{product.price}</p>
        </Link>
        <button
          id="teste05"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.sendInformation }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Card;
