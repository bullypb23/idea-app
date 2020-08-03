import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import AddNewIdea from './containers/AddNewIdea/AddNewIdea';
import HomePage from './components/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/add_new' component={AddNewIdea} />
        </Switch>
      </div>
    );
  }
}

export default App;