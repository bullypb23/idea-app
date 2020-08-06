import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Idea from '../Idea/Idea';
import classes from './Ideas.module.scss';

const Ideas = props => {
  const [ideas, setIdeas] = useState({});

  useEffect(() => {
    getIdeas();
  }, []);

  const getIdeas = () => {
    axios.get('https://idea-app-38f3a.firebaseio.com/ideas.json')
      .then(response => {
        setIdeas(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteIdea = id => {
    axios.delete(`https://idea-app-38f3a.firebaseio.com/ideas/${id}.json`)
      .then(response => {
        getIdeas();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleEditIdea = id => {
    props.history.push(`/ideas/${id}`);
  }

  let ideasArray;
  let ideasList;

  if(ideas) {
    ideasArray = Object.keys(ideas);
    ideasList = ideasArray.map(idea => {
      return <Idea 
        key={idea}
        idea={idea}
        ideaData={ideas[idea]}
        handleDeleteIdea={handleDeleteIdea}
        handleEditIdea={handleEditIdea} />
    })
  } else {
    ideasList = <p>No ideas created. Go to <Link to="add_new_idea">add new idea</Link> and create our new idea</p>
  }
  return (
    <div className={classes.Ideas}>
      <h1>All ideas</h1>
      <div className={classes.IdeasContainer}>
        {ideasList}
      </div>
    </div>
  )
}

export default Ideas;