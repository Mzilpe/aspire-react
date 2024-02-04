import React from "react";
import { Formik, Form, Field, ErrorMessage  } from "formik";

import './AddNewCard.scss'

const AddNewCard = (props) => {

    return(
        <div className="add-new-card">
            <Formik
                initialValues={{ cardHolderName: '' }}
                validate={values => {
                const errors = {};
                if (!values.cardHolderName) {
                    errors.cardHolderName = 'Required';
                } else if (
                    !/^[A-Z]/i.test(values.cardHolderName)
                ) {
                    errors.cardHolderName = 'Invalid name format';
                }
                return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    props.addNewCardHandler(values)
                    setSubmitting(false);;
                }}
            >
                {({ isSubmitting }) => (
                <Form className="add-new-card__form">
                    <div className="add-new-card__form__fields">
                        <label>Enter Cardholder Name:</label>
                        <Field className="add-new-card__form__fields__field" type="text" name="cardHolderName" />
                        <ErrorMessage className="add-new-card__form__fields__error" name="cardHolderName" component="div" />
                    </div>
                    <div className="add-new-card__form__actions">
                        <button className="add-new-card__form__actions__submit" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <button className="add-new-card__form__actions__cancel" onClick={(e) => props.outSideClickHandler(e)}>
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
            </Formik>
      </div>
    );
}

export default AddNewCard;