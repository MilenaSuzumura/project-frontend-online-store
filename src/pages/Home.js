import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, productApi, getCategoriesId } from '../services/api';
import Card from '../componets/Card';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: '',
      productName: '',
      resultAPIProduct: [],
      search: false,
      resultAPIcategory: [],
      cart: [],
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState((prevState) => ({ ...prevState, categories }));
  };

  nameProduct = ({ target }) => {
    const { value } = target;
    this.setState({
      productName: value,
    });
  };

  acessarAPI = async () => {
    const { productName } = this.state;
    const resultadoAPI = await productApi(productName);
    const { results } = resultadoAPI;
    this.setState({
      resultAPIProduct: results,
      search: true,
    });
  };

  selectCategory = async ({ target }) => {
    const { value } = target;
    const select = await getCategoriesId(value);
    const { results } = select;
    this.setState({
      resultAPIcategory: results,
    });
  };

  //  handleClick = (title, price) => {
  //    const item = {
  //      nome: title,
  //      preco: price,
  //    };

  //    this.setState((prevState) => ({
  //      cart: [...prevState.cart, item],
  //    }), () => {
  //      const { cart } = this.state;
  //      localStorage.setItem('cart', JSON.stringify(cart));
  //    });
  //  }

  handleClick = (title, price) => {
    const item = {
      nome: title,
      preco: price,
    };
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage === null) {
      this.setState((prevState) => ({
        cart: [...prevState.cart, item],
      }), () => {
        const { cart } = this.state;
        localStorage.setItem('cart', JSON.stringify(cart));
      });
    } else {
      storage.push(item);
      localStorage.setItem('cart', JSON.stringify(storage));
    }
  }

  render() {
    const {
      categories,
      productName,
      resultAPIProduct,
      search,
      resultAPIcategory,
    } = this.state;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link id="teste02" to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <aside>
          {categories.map(({ name, id }) => (
            <label htmlFor={ `${name}${id}` } key={ name } data-testid="category">
              <input
                type="radio"
                value={ id }
                id={ `${name}${id}` }
                name="selectedCategory"
                onClick={ this.selectCategory }
              />
              {name}
            </label>
          ))}
        </aside>
        <label htmlFor="input-pesquisa">
          <input
            type="text"
            data-testid="query-input"
            id="teste"
            name="input-pesquisa"
            value={ productName }
            onChange={ this.nameProduct }
          />
        </label>
        <button
          id="teste01"
          type="submit"
          data-testid="query-button"
          onClick={ this.acessarAPI }
        >
          Pesquisar
        </button>
        {search
          && (resultAPIProduct.length > 0 ? (
            resultAPIProduct.map((elemento) => {
              const { title } = elemento;
              return (
                <Card
                  key={ title }
                  product={ elemento }
                  handleClick={ this.handleClick }
                />
              );
            })
          ) : (
            <h1>Nenhum produto foi encontrado</h1>
          ))}
        {resultAPIcategory.length > 0
          && resultAPIcategory.map((element) => {
            const { title } = element;
            return (
              <Card
                key={ title }
                product={ element }
                handleClick={ this.handleClick }
              />
            );
          })}
      </div>
    );
  }
}
