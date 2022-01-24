import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';
import SignModal from './components/signup/SignModal';
import MyListPage from './pages/MyListPage';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <SignModal />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/mylist" component={MyListPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
