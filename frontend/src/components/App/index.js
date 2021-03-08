// == Import npm
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import des composants
import Header from 'src/containers/Header';
import Home from 'src/components/Home';
import Connexion from 'src/containers/Connexion';
import Cryptos from 'src/containers/Cryptos';
import Order from 'src/containers/Order';
import About from 'src/components/About';
import Dashboard from 'src/containers/Dashboard';
import Ranking from 'src/containers/Ranking';

// == Import
import './app.scss';
import NotFound from '../NotFound';

// == Composant

const App = ({ logged, getUserDataLocal, theme }) => {

  useEffect(
    getUserDataLocal,
    []
  )
  const classTheme = theme ? 'dark' : 'light';

  return (
    <div className={`app ${classTheme}`} >
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/connexion" exact>
          {
            !logged
              ? <Connexion page="signIn" />
              : <Redirect to="/cryptomonnaies" />
          }
        </Route>
        <Route path="/recuperationMdp" exact>
          <Connexion page="resetPass" />
        </Route>
        <Route path="/nouveau-mot-de-passe/:slug" >
          {
            !logged
              ? <Connexion page="newPass" />
              : <Redirect to="/" />
          }
        </Route>
        <Route path="/inscription" exact>
          {
            !logged
              ? <Connexion page="signUp" />
              : <Redirect to="/" />
          }
        </Route>
        <Route path="/ordre/:slug">
          {
            logged
              ? <Order />
              : <Redirect to="/connexion" />
          }
        </Route>
        <Route path="/cryptomonnaies" exact>
          <Cryptos />
        </Route>
        <Route path="/dashboard/:slug" exact>
          {

            logged
              ? <Dashboard />
              : <Redirect to="/connexion" />
          }
        </Route>
        <Route path="/classement" exact>
          <Ranking />
        </Route>
        <Route path="/qui-sommes-nous" exact>
          <About />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes = {
  logged: PropTypes.bool.isRequired,
  theme: PropTypes.bool.isRequired,
};

// == Export
export default App;
