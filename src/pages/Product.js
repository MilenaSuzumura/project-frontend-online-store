import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { product } = this.state;
    const { title, thumbnail, price, warranty } = product;
    return (
      <div data-testid="product-detail-link">
        <p data-testid="product-detail-name">
          { title }
        </p>
        <p>
          { price }
        </p>
        <img src={ thumbnail } alt={ title } />
        <p>{ warranty }</p>
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
