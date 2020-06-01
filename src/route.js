import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProductDashboard from './components/products/ProductDashboard';
import AddProduct from './components/products/AddProduct';
import ProductCart from './components/products/ProductCart';

const routes = () => (
  <Router>
    <Route exact path='/' component={ProductDashboard}></Route>
    <Route exact path='/addProduct' component={AddProduct}></Route>
    <Route exact path='/cartProduct' component={ProductCart}></Route>
  </Router>
)

export default routes;