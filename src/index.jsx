import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from './Routes';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDom.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
