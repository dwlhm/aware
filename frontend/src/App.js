import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link, useLocation, useParams } from 'react-router-dom';
import Beranda from './Containers/Beranda';
import ProductInput from './Containers/ProductInput';
import ProductOutput from './Containers/ProductOutput';
import Warehouse from './Containers/Warehouse';
import ProductList from './Containers/ProductList';
import Scanner from './Containers/Scanner'
import Detail from './Containers/Detail'

function App() {

  return (
    <div style={{minHeight: 100 + 'vh'}}>
      <Router>
      <nav className="navbar navbar-fixed-top p-0 navbar-expand-lg navbar-light">
        <div className="container-fluid bg-warning">
            <ul className="nav navbar-nav">
            <li><img className="image" src="a.jpg" id="imgBerandaBrand" style={{width: 6 + 'rem'}} /> AUTOMATION WAREHOUSE</li>
            </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <Link className="nav-link" to="#">Profil</Link>
                </li>
              </ul>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <div className="container-fluid row pr-0" style={{minHeight: 100 + 'vh'}}>
          <div className="col col-md-auto bg-primary p-4">
            <Link to="/" style={{textDecoration: 'none'}}>
              <h2 className="m-0 pb-3" style={{color: 'white', borderBottomWidth: 1 + 'px', borderBottomStyle: 'solid', borderBottomColor: 'white' }}>DASHBOARD</h2>
            </Link>
            
            <ul className="list-group border-0 bg-transparent"  id="beranda">
              <li className="list-group-item border-0 p-0 my-2 bg-transparent">
                <Link to={`/scanner`} className="btn btn-dark border-0" style={{width: 100 + '%' }}>
                  <div className="row">
                    <div className="col col-md-auto">
                      <img src="hand.png" />
                    </div>
                    <div className="col d-flex align-items-center">
                      Scanner
                    </div>
                  </div>
                </Link>
              </li>

              <li className="list-group-item border-0 p-0 my-2 bg-transparent">
                <Link to={`/product-output`} className="btn btn-dark border-0" style={{width: 100 + '%' }}>
                  <div className="row">
                    <div className="col col-md-auto">
                      <img src="group.png" />
                    </div>
                    <div className="col d-flex align-items-center">
                      Product Output
                    </div>
                  </div>
                </Link>
              </li>

              <li className="list-group-item border-0 p-0 my-2 bg-transparent">
                <Link to={`/warehouse`} className="btn btn-dark border-0" style={{width: 100 + '%' }}>
                  <div className="row">
                    <div className="col col-md-auto">
                      <img src="key.png" />
                    </div>
                    <div className="col d-flex align-items-center">
                      Warehouse
                    </div>
                  </div>
                </Link>
              </li>

            </ul>
          </div>
          <div className="col pr-0 py-0">
          <Switch>
            <Route exact path="/">
              <ProductList />
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
            <Route path="/scanner">
              <Scanner />
            </Route>
            <Route path="/:code">
              <Detail />
            </Route>
          </Switch>
          </div>
        </div>
        
      </div>

      
        
      </Router>
    </div>
  );
}

function Child() {

  let { code } = useParams()
  return (
    <div>
      {code ? (
        <h3>
          The <code>name</code> in the query string is &quot;{code}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}


export default App;
