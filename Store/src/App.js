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

class App extends Component {
  static service = new ProductService();

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Fragment>
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/product/create" component={ProductCreate} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
