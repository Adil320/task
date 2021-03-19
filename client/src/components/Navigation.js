import React from "react";
import QuestPage from './QuestPage'
import Main from './Main'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Главная</div>,
    main: () => <Main />
  },
  {
    path: "/questPage",
    sidebar: () => <div>Рабочая</div>,
    main: () => <QuestPage />
  }
];

const Navigation = () => {
  return (
    <div >
      <Router>
        <div>
          <div className="card bg-info text-center text-light rounded-0 mb-5">
            <h1 className='display-4'>
              <i className="fas fa-clipboard-list mr-3"></i><span className="text-dark mr-3">Task</span>
            </h1>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Link style={{ textDecoration: 'none', color: 'black',fontSize: '20px' }} to="/">Главная</Link>
                </div>
                <div className="col-sm">
                  <Link style={{ textDecoration: 'none', color: 'black',fontSize: '20px' }} to="/questPage">Рабочая</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '50px'}}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default Navigation
