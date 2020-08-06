import React, { useState } from 'react';
import classes from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);
  let menuClasses = [classes.MenuBtnBurger];

  if(open === true) {
    menuClasses.push(classes.Open);
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>
        <Link to="/">
          <img src={logo} alt="Logo"/>
        </Link>
      </div>
      <div className={classes.MenuBtn} onClick={toggleMenu}>
        <span className={menuClasses.join(' ')}></span>
      </div>
      <Navigation open={open} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header;