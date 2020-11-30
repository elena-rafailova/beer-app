import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import Login from './pages/Login/Login';
import HomeScreen from './pages/Home/HomeScreen';
import Favorites from './pages/Favorites/Favorites';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import BeerInfo from './pages/BeerInfo/BeerInfo';
import MainLayout from './MainLayout/MainLayout';
import ErrorPage from './components/ErrorPage/ErrorPage';

const App = () => {
    return (
      <div className="App">
          <ToastContainer
              autoClose={2500}
              hideProgressBar={true}
          />
          <Router>
              <Switch>
                  <Route path="/" exact component={Login} />
                  <Route path="/login" component={Login} />
                  <Route path="/home" exact render={() => <MainLayout component={<HomeScreen/>} />}/>
                  <Route path="/home/:page" exact render={() => <MainLayout component={<HomeScreen/>} />}/>
                  <Route path="/favorites" render={() => <MainLayout component={<Favorites/>}/>}/>
                  <Route path="/profile" render={() => <MainLayout component={<ProfileSettings/>}/>}/>
                  <Route path="/beer/:id" render={({ match }) => <MainLayout component={<BeerInfo match={match}/>}/>}/>
                  <Route>{ErrorPage}</Route>
              </Switch>
          </Router>
      </div>
  );
};

export default App;
