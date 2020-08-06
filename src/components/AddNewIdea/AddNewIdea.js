import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import TextError from '../TextError/TextError';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import classes from './AddNewIdea.module.scss';

const initialValues = {
  number: '',
  name: '',
  description: '',
  rating: '',
  category: '',
  expectation: ''
}

const validationSchema = Yup.object({
  number: Yup.number().required('Required!').min(1, 'Minimum id is 1!'),
  name: Yup.string().required('This field is required!'),
  description: Yup.string().required('This field is required!'),
  rating: Yup.number().required('Required!').min(1, 'Minimum is 1!').max(10, 'Maximum is 10!'),
  category: Yup.string().required('This field is required!'),
  expectation: Yup.string().required('This field is required!')
})

const AddNewIdea = props => {
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState({});

  useEffect(() => {
    axios.get('https://idea-app-38f3a.firebaseio.com/categories.json')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setErrorMessage('Something went wrong!');
      })
  }, [])
  
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    
    axios.post('https://idea-app-38f3a.firebaseio.com/ideas.json', {
      ...values,
      created_at: new Date(),
      updated_at: new Date()
    })
    .then(response => {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        props.history.push('/ideas');
      })
      .catch(error => {
        onSubmitProps.setSubmitting(false);
        setErrorMessage('Something went wrong!');
      })
  };

  return (
    <div className={classes.Container}>
      <h1>Add new idea</h1>
      <div className={classes.FormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => {
            return (
              <Form>
                {formik.isSubmitting ? <Spinner /> : null}
                <div className={classes.Wrapper}>
                  <div className={classes.FormControl}>
                    <label id="number">No</label>
                    <Field type="text" name="number" htmlFor="number" />
                    <ErrorMessage name="number" component={TextError} />
                  </div>

                  <div className={classes.FormControl}>
                    <label id="name">Name</label>
                    <Field type="text" name="name" htmlFor="name" />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                </div>

                <div className={classes.FormControl}>
                  <label id="description">Description</label>
                  <Field as="textarea" rows={3} name="description" htmlFor="description" />
                  <ErrorMessage name="description" component={TextError} />
                </div>

                <div className={classes.Wrapper}>
                  <div className={classes.FormControl}>
                    <label id="rating">Rating</label>
                    <Field type="text" name="rating" htmlFor="rating" />
                    <ErrorMessage name="rating" component={TextError} />
                  </div>

                  <div className={classes.FormControl}>
                    <label id="category">Category <span><Link to="/edit_categories">(edit categories)</Link></span></label>
                    <Field as="select" name="category" htmlFor="category">
                      {Object.keys(categories).map(id => {
                        return <option key={id} value={categories[id].category}>{categories[id].category}</option>
                      })}
                    </Field>
                    <ErrorMessage name="category" component={TextError} />
                  </div>
                </div>

                <div className={classes.FormControl}>
                  <label id="expectation">Expectation</label>
                  <Field type="text" name="expectation" htmlFor="expectation" />
                  <ErrorMessage name="expectation" component={TextError} />
                </div>

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                  Add
                </button>

                {errorMessage ? (<div><span className="error">{errorMessage}</span></div>) : null}

              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewIdea;