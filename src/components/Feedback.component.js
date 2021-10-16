import React, { Component } from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import survey from './feedback_form.json';
import axios from 'axios';

Survey.StylesManager.applyTheme("default");

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:"Anonymous"
        }
    }

    //Define a callback methods on survey complete
    async onComplete(survey, options) {
        console.log("Survey results: " + JSON.stringify(survey.data));

        axios.post('http://localhost:5000/feedback/save', survey.data)
            .then(res => {
                console.log("Successfully Saved Survey");
            })
            .catch(err => {
                console.log("Uh Oh");
            })
    }

    render() {
        var model = new Survey.Model(survey);

        return (
            <div>
                <h2>Feedback</h2>
                <p>Help us improve this website.</p>
                <p>Report any issues with the website here or any suggestions to help make it better.</p>
                <p>Please be 100% honest.</p>
                <Survey.Survey model={model} onComplete={this.onComplete.bind(this)}/>
            </div>
        )
    }
}

