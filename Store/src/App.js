import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation';
import Home from './views/home';
import NotFound from './views/not-found';
import Register from './views/register';
import Login from './views/login';
import Logout from './views/logout';
import ProductCreate from './views/product-create';
import ProductService from './services/product-service';
import ProductDetails from './views/product-details';
import ProductEdit from './views/product-edit';
import ProductDelete from './views/product-delete';
import Checkout from './views/orders-checkout';
import OrdersPending from './views/orders-pending';

class App extends Component {
  static service = new ProductService();

  componentWillMount() {
    if (!window.localStorage.getItem('cart')) {
      window.localStorage.setItem('cart', []);
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <Navigation />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/product/create" exact component={ProductCreate} />
                <Route path="/product/details/:id" component={ProductDetails} />
                <Route path="/product/edit/:id" component={ProductEdit} />
                <Route path="/product/delete/:id" component={ProductDelete} />
                <Route path="/orders/pending" exact component={OrdersPending} />
                <Route path="/orders/checkout" component={Checkout} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
