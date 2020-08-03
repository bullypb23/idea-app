import React from 'react';
import classes from './Navigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <nav>
        <ul>
          <NavigationItem link='/add_new'>Add New Idea</NavigationItem>
          <NavigationItem link='/list'>See All Ideas</NavigationItem>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation;