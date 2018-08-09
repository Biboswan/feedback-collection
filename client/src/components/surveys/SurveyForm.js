// Surveynews shows surveyform
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFIELDS from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFIELDS, ({label, name }) => 
            <Field key={name} label={label} name={name} type="text" component={SurveyField}/>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)} >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text ">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className=" material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFIELDS, ({ name, noValueError }) => {
        if (!values[name]) {
        errors[name] = noValueError;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
