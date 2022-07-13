import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Content from './componets/Content';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}
