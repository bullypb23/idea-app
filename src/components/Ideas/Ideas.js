import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Idea from '../Idea/Idea';
import classes from './Ideas.module.scss';
import Spinner from '../Spinner/Spinner';

const Ideas = props => {
  const [errorMessage, setErrorMessage] = useState('');
  const [ideas, setIdeas] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getIdeas();
  }, []);

  const getIdeas = () => {
    setLoading(true);
    axios.get('https://idea-app-38f3a.firebaseio.com/ideas.json')
      .then(response => {
        setIdeas(response.data);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage('Something went wrong!');
        setLoading(false);
      })
  }

  const handleDeleteIdea = id => {
    setLoading(true);
    axios.delete(`https://idea-app-38f3a.firebaseio.com/ideas/${id}.json`)
      .then(response => {
        getIdeas();
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage('Something went wrong!');
        setLoading(false);
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
      {loading ? <Spinner /> : null}
      <div className={classes.IdeasContainer}>
        {ideasList}
      </div>
      {errorMessage ? (<div><span className="error">{errorMessage}</span></div>) : null}
    </div>
  )
}

export default Ideas;