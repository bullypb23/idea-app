import React from 'react';
import classes from './Idea.module.scss';
import { FaStar } from 'react-icons/fa';
import moment from 'moment';

const Idea = props => {
  let date = moment(props.ideaData.created_at).format('DD-MMM-YYYY HH:mm:ss');
  return (
    <div className={classes.Idea}>
      <h3>{props.ideaData.number} - {props.ideaData.name}</h3>
      <span>Created at: {date}</span>
      <p><strong>Category: </strong>{props.ideaData.category}</p>
      <p><strong>Description</strong>: {props.ideaData.description}</p>
      <p>
        <strong>Rating: </strong>
        <span>{Array.from(Array(+props.ideaData.rating)).map((x, index) => <FaStar key={index} />)}</span>
      </p>
      <p><strong>Expectation: </strong>{props.ideaData.expectation}</p>
      <div className={classes.ButtonContainer}>
        <button onClick={() => props.handleEditIdea(props.idea)}>Edit</button>
        <button onClick={() => props.handleDeleteIdea(props.idea)}>Delete</button>
      </div>
    </div>
  )
}

export default Idea;