import React from 'react';
import classes from './HomePage.module.scss';
import idea from '../../assets/img/idea.png';

const HomePage = () => {
return (
    <div className={classes.HomePage}>
      <div>
        <img src={idea} alt="Idea"/>
      </div>
      <div>
        <h1>Welcome to Idea app</h1>
        <p>Write your daily ideas here!</p>
      </div>
    </div>
  )
}

export default HomePage;