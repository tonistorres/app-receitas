import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" component={ Login } />
          <Route path="/drinks/:id" component={ Login } />
          <Route path="/foods/:id/in-progress" component={ Login } />
          <Route path="/drinks/:id/in-progress" component={ Login } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ Login } />
          <Route path="/explore/drinks" component={ Login } />
          <Route path="/explore/foods/ingredients" component={ Login } />
          <Route path="/explore/drinks/ingredients" component={ Login } />
          <Route path="/explore/foods/nationalities" component={ Login } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ Login } />
          <Route path="/favorite-recipes" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
