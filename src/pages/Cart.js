import React from 'react';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount = () => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const cont = [];

    if (storage !== null) {
      let qnt = 1;
      for (let i = 0; i < storage.length; i += 1) {
        if (i < storage.length - 1 && storage[i].nome === storage[i + 1].nome) {
          qnt += 1;
        } else {
          cont.push({ nome: storage[i].nome, preco: storage[i].preco, qnt });
          qnt = 1;
        }
      }

      this.setState({ cart: cont });
    }
  }

  handleclickIncrease = ({ target }) => {
    const { cart } = this.state;
    const stateCart = cart.map((element) => {
      if (element.nome === target.name) {
        element.qnt += 1;
      }
      return element;
    });
    this.setState({
      cart: stateCart,
    });
  }

  handleclickDecrease = ({ target }) => {
    const { cart } = this.state;
    const stateCart = cart.map((element) => {
      if (element.nome === target.name && element.qnt > 1) {
        element.qnt -= 1;
      }
      return element;
    });
    this.setState({
      cart: stateCart,
    });
  }

  render() {
    const { cart } = this.state;
    return (
      cart.length > 0 ? (
        cart.map((item) => (
          <div key={ item.nome }>
            <p data-testid="shopping-cart-product-name">{item.nome}</p>
            <p>{item.preco}</p>
            <p data-testid="shopping-cart-product-quantity">
              Quantidade:
              {item.qnt}
            </p>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ this.handleclickIncrease }
              name={ item.nome }
            >
              +

            </button>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.handleclickDecrease }
              name={ item.nome }
            >
              -

            </button>
          </div>
        ))
      ) : (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      )
    );
  }
}
