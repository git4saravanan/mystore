import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import "./App.css";

import CreateProduct from "./components/create-product-component";
import EditProduct from "./components/edit-product-component";
import ProductList from "./components/list-product-component";


class App extends Component{
  render() {
    return (
      <Router>
        <div className="app container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <img src={logo} width="30" height="30" alt="My Products" />
            
            My Products
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Product List</Link>                  
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Product</Link> 
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={ProductList} />
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/create" component={CreateProduct} />
        </div>        
      </Router>
    );
  }
}

export default App;
