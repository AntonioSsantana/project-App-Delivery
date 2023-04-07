import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './Components/Provider';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import Admin from './Pages/Admin';

function App() {
  return (
    <main>
      <Provider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/admin/manage" component={ Admin } />
          {/* <Route exact path="/customer/orders" component={ Orders } /> */}
        </Switch>
      </Provider>
    </main>
  );
}

export default App;
