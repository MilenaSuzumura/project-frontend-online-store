import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { product } = this.props;
    return (
      <div data-testid="product">
        <p>{ product.title }</p>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>
          { product.price }
        </p>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default Card;
