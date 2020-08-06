import React, { useEffect, useState } from 'react';
import classes from './Categories.module.scss';
import axios from 'axios';
import { FaTimesCircle } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from '../TextError/TextError';
import * as Yup from 'yup';

const initialValues = {
  category: ''
}

const validationSchema = Yup.object({
  category: Yup.string().required('This field is required!')
})

const Categories = props => {
  const [categories, setCategories] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('https://idea-app-38f3a.firebaseio.com/categories.json')
      .then(response => {
        setCategories(response.data);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteCategory = id => {
    axios.delete(`https://idea-app-38f3a.firebaseio.com/categories/${id}.json`)
      .then(response => {
        setSuccessMessage('Successfully deleted category!');
        fetchCategories();
      })
      .catch(error => {
        setErrorMessage('Something went wrong!')
      })
  }

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    axios.post('https://idea-app-38f3a.firebaseio.com/categories.json', values)
      .then(response => {
        onSubmitProps.resetForm();
        fetchCategories();
      })
      .catch(error => {
        setErrorMessage('Something went wrong!');
      })
  }

  let categoriesList;

  if(loaded && categories) {
    categoriesList = Object.keys(categories).map((id, index) => {
      return (
        <div className={classes.Category} key={id}>
          <p>{categories[id].category}</p>
          <div>
            <FaTimesCircle style={{color: 'red', cursor: 'pointer'}} onClick={() => handleDeleteCategory(id)} />
          </div>
        </div>
      );
    })
  } else {
    categoriesList = <p style={{ width: '100%'}}>There are no categories. Please add new category.</p>
  }

  return (
    <div className={classes.Categories}>
      <h1>Edit categories</h1>
      <div className={classes.CategoriesContainer}>
        {categoriesList}
      </div>
      {successMessage ? <div className={classes.Messages}><span className="success">{successMessage}</span></div> : null}
      {errorMessage ? <div className={classes.Messages}><span className="error">{errorMessage}</span></div> : null}
      <div className={classes.FormContainer}>
        <h3>Add new category</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {formik => {
            return (
              <Form>
                <div className={classes.FormControl}>
                  <Field type="text" name="category" />
                  <ErrorMessage name="category" component={TextError} />
                </div>

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Add</button>

              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default Categories;