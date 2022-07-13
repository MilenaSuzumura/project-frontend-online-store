import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    avaliation: [],
    email: '',
    enableButton: true,
    messageInput: '',
    rating: '',

  }

  componentDidMount() {
    const localStorageInfo = JSON.parse(localStorage.getItem('Avaliação'));
    if (localStorageInfo) {
      this.setState({
        avaliation: localStorageInfo,
      });
    }
  }

  handleForm = ({ target }) => {
    const radio = target.checked;
    const email = target.value;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });

    if (email && radio) {
      this.setState({ enableButton: false });
    } else this.setState({ enableButton: true });
  }

  handleSaveForm = () => {
    const { email, messageInput, rating, avaliation } = this.state;
    const objectInformation = { email, messageInput, rating };
    this.setState((prev) => ({
      avaliation: [...prev.avaliation, objectInformation],
    }));
    if (avaliation) {
      const info = [...avaliation, objectInformation];
      localStorage.setItem('Avaliação', JSON.stringify(info));
    } else {
      localStorage.setItem('Avaliação', JSON.stringify([objectInformation]));
    }

    this.setState({
      email: '',
      enableButton: true,
      messageInput: '',
      rating: '',
    });
  };

  render() {
    const { email, enableButton, messageInput, avaliation } = this.state;
    const ARRAY_RATING = ['1', '2', '3', '4', '5'];
    return (

      <div className="form-validacao">
        <form>
          <div>
            <label htmlFor="email">
              Email:
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.handleForm }
                placeholder="E-mail"
                value={ email }
              />
            </label>
          </div>
          {ARRAY_RATING.map((number, index) => (
            <div key={ index }>
              <label htmlFor="rating">
                <input
                  data-testid={ `${number}-rating` }
                  type="radio"
                  name="rating"
                  onChange={ this.handleForm }
                  value={ number }
                  id=""
                />
              </label>
            </div>
          ))}
          <label htmlFor="input-message">
            Observacão:
            <textarea
              data-testid="product-detail-evaluation"
              name="messageInput"
              id="input-message"
              onChange={ this.handleForm }
              placeholder="Mensagem (opcional)"
              value={ messageInput }
            />
          </label>

          <button
            className="btn-salvar"
            data-testid="submit-review-btn"
            disabled={ enableButton }
            onClick={ this.handleSaveForm }
            type="button"
          >
            Salvar
          </button>
        </form>
        <section>
          {avaliation && avaliation.map((each, index) => (
            <div key={ index }>
              <p>{ each.email }</p>
              <p>{ `Avaliação: ${each.rating}`}</p>
              <span>{ each.messageInput }</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
