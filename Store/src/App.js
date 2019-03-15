import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import AuthRoute from './components/auth-route';
import UserInfo from './views/user-info';
import SearchResults from './views/search-results';

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
            <ToastContainer autoClose={1500} />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product/search" component={SearchResults} />
                <Route path="/register" exact render={() => (
                  !!window.localStorage.getItem('auth_token')
                    ? <Redirect to='/' />
                    : <Register />
                )} />
                <Route path="/login" exact render={() => (
                  !!window.localStorage.getItem('auth_token')
                    ? <Redirect to='/' />
                    : <Login />
                )} />
                <Route path="/logout" exact component={Logout} />
                <AuthRoute path="/product/create" exact
                  component={ProductCreate}
                  allowedRoles={['Admin']}
                  isLoggedIn={!!window.localStorage.getItem('auth_token')} />
                <AuthRoute path="/product/edit/:id"
                  component={ProductEdit}
                  allowedRoles={['Admin']}
                  isLoggedIn={!!window.localStorage.getItem('auth_token')} />
                <Route path="/product/details/:id" component={ProductDetails} />
                <AuthRoute path="/product/delete/:id"
                  component={ProductDelete}
                  allowedRoles={['Admin']}
                  isLoggedIn={!!window.localStorage.getItem('auth_token')} />
                <AuthRoute path="/orders/pending" exact
                  component={OrdersPending}
                  allowedRoles={['Admin']}
                  isLoggedIn={!!window.localStorage.getItem('auth_token')} />
                <Route path="/orders/checkout" component={Checkout} />
                <AuthRoute path="/user/info"
                  component={UserInfo}
                  isLoggedIn={!!window.localStorage.getItem('auth_token')} />
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
