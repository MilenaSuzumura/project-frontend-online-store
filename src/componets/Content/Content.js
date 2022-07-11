import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import Product from '../../pages/Product';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/product/:id" component={ Product } />
      </Switch>
    );
  }
}
