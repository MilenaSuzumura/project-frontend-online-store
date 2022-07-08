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
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState((prevState) => ({ ...prevState, categories }));
  }

  nameProduct = ({ target }) => {
    const { value } = target;
    this.setState({
      productName: value,
    });
  }

  acessarAPI = async () => {
    const { productName } = this.state;
    const resultadoAPI = await productApi(productName);
    const { results } = resultadoAPI;
    this.setState({
      resultAPIProduct: results,
      search: true,
    });
  }

  selectCategory = async ({ target }) => {
    const { value } = target;
    const select = await getCategoriesId(value);
    const { results } = select;
    this.setState({
      resultAPIcategory: results,
    });
  }

  render() {
    const { categories,
      productName,
      resultAPIProduct,
      search,
      resultAPIcategory } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <aside>
          { categories.map(({ name, id }) => (
            <label htmlFor={ `${name}${id}` } key={ name } data-testid="category">
              <input
                type="radio"
                value={ id }
                id={ `${name}${id}` }
                name="selectedCategory"
                onClick={ this.selectCategory }
              />
              { name }
            </label>
          ))}
        </aside>
        <label htmlFor="input-pesquisa">
          <input
            type="text"
            data-testid="query-input"
            name="input-pesquisa"
            value={ productName }
            onChange={ this.nameProduct }
          />
        </label>
        <button type="submit" data-testid="query-button" onClick={ this.acessarAPI }>
          Pesquisar
        </button>
        {
          search && (resultAPIProduct.length > 0 ? (resultAPIProduct.map((elemento) => {
            const { title } = elemento;
            return (
              <Card key={ title } product={ elemento } />
            );
          }))
            : (
              <h1>Nenhum produto foi encontrado</h1>
            ))
        }
        {
          resultAPIcategory.length > 0 && (resultAPIcategory.map((element) => {
            const { title } = element;
            return (
              <Card key={ title } product={ element } />
            );
          }))
        }
      </div>
    );
  }
}
