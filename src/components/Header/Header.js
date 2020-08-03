import React from 'react';
import classes from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>
        <Link to="/">
          <img src={logo} alt="Logo"/>
        </Link>
      </div>
      <Navigation />
    </header>
  )
}

export default Header;