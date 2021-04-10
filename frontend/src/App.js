import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Beranda from './Containers/Beranda';
import ProductInput from './Containers/ProductInput';
import ProductOutput from './Containers/ProductOutput';
import Warehouse from './Containers/Warehouse';
import ProductList from './Containers/ProductList';

function App() {
  return (
    <div>
      <Router>
      <nav className="navbar navbar-fixed-top p-0 navbar-expand-lg navbar-light" style={{backgroundColor: '#D3D3D3'}}>
        <div className="container">
            <ul className="nav navbar-nav">
            <li><img className="image" src="a.jpg" id="imgBerandaBrand" /> AUTOMATION WAREHOUSE</li>
            </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <Link className="nav-link" to="#">Cara Mendaftar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Profil</Link>
                </li>
              </ul>
        </div>
      </nav>

      <div className="container pt-3 pb-3">
        <div className="row">
          <div className="col col-md-auto">
            <Link to="/" style={{textDecoration: 'none'}}>
              <h2 className="m-0 pb-3" style={{color: 'white', borderBottomWidth: 1 + 'px', borderBottomStyle: 'solid', borderBottomColor: 'white' }}>DASHBOARD</h2>
            </Link>
            
            <ul className="list-group">
              <li className="list-group-item">
                <Link to={`/product-input`}>
                  <div className="row">
                    <div className="col col-md-auto">
                      <img src="hand.png" />
                    </div>
                    <div className="col d-flex align-items-center">
                      Product Input
                    </div>
                  </div>
                </Link>
              </li>
              <li className="list-group-item"><Link to={`/product-output`}>
                <div className="row">
                  <div className="col col-md-auto">
                    <img src="group.png" />
                  </div>
                  <div className="col d-flex align-items-center">
                    Product Output
                  </div>
                </div>
              </Link></li>
              <li className="list-group-item"><Link to={`/warehouse`}>
                <div className="row">
                  <div className="col col-md-auto">
                    <img src="key.png" />
                  </div>
                  <div className="col d-flex align-items-center">
                    Warehouse
                  </div>
                </div>
              </Link></li>
              <li className="list-group-item"><Link to={`/product-list`}>
                <div className="row">
                  <div className="col col-md-auto">
                    <img src="glass.png" />
                  </div>
                  <div className="col d-flex align-items-center">
                  Product List
                  </div>
                </div>
              </Link></li>
            </ul>
          </div>
          <div className="col">
          <Switch>
            <Route exact path="/">
              <Beranda />
            </Route>
            <Route path="/product-input">
              <ProductInput />
            </Route>
            <Route path="/product-output">
              <ProductOutput />
            </Route>
            <Route path="/warehouse">
              <Warehouse />
            </Route>
            <Route path="/product-list">
              <ProductList />
            </Route>
          </Switch>
          </div>
        </div>
        
      </div>

      
        
      </Router>
    </div>
  );
}

export default App;
