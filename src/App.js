import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AddNewIdea from './components/AddNewIdea/AddNewIdea';
import HomePage from './components/HomePage/HomePage';
import Ideas from './components/Ideas/Ideas';
import EditIdea from './components/EditIdea/EditIdea';
import Categories from './components/Categories/Categories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="main">
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/add_new_idea' component={AddNewIdea} />
            <Route path='/edit_categories' component={Categories} />
            <Route exact path="/ideas/:id" component={EditIdea} />
            <Route path='/ideas' component={Ideas} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);