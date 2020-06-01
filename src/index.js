import React from 'react';
import ReactDOM from 'react-dom';
import routes from './route.js';
import {Provider} from 'react-redux';
import store from './redux/store';

const route = routes()

ReactDOM.render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.getElementById('root')
);
