import React from 'react';
import ReactDOM from 'react-dom'
import Login from './Components/Login';
import Home_Page from './Components/Home_Page';
import { Router, Switch, Route, Link } from 'react-router-dom';
import history from './history';
import Sign_up from './Components/Sign-up';
import Cart from './Components/Cart';
import ProductDetails from './Components/Product_details';
import ProductManager from './Components/ProductManagerPage';
import SalesManager from './Components/SalesManager';
import UserPage from './Components/userprofile';
import adder from './Components/itemadder';



function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/home" exact component={Home_Page}></Route>
        <Route path="/signup" exact component={Sign_up}></Route>
        <Route path="/cart" exact component={Cart}></Route>
        <Route path="/productdetails" exact component={ProductDetails}></Route>
        <Route path="/productmanager" exact component={ProductManager}></Route>
        <Route path="/salesmanager" exact component={SalesManager}></Route>     
        <Route path="/profile" exact component={UserPage}></Route>                 
      </Switch>
    </Router>
  );
}

export default App;
