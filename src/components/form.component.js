import React, { Component } from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import survey from './form.json';
import axios from 'axios';

const transport = axios.create({withCredentials: true});
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

	await transport.post("http://localhost:5000/users/current-session")
        .then(res => {
			console.log("Logged in as "+ res.data.username);
			console.log(this.state.username);
            this.setState({username: res.data.username});

        })
        .catch(err =>{
            console.log("Not logged in")
            console.log(result)
            axios.post("http://localhost:5000/survey/result", result)
            .then(res => {
                    console.log("Sending survey results to API.");
                    console.log(res.data);
                    sessionStorage.setItem("surveyData", JSON.stringify(res.data));
                    window.location.replace(`/form_result?result=${res.data._id}`);
                        })
                    }
        )
        var result= {
            username: this.state.username,
            form: survey.data
    
        }
        
    axios.post("http://localhost:5000/survey/result", result)
    .then(res => {
            console.log("Sending survey results to API.");
            console.log(res.data);
            sessionStorage.setItem("surveyData", JSON.stringify(res.data));
            window.location.replace(`/form_result?result=${res.data._id}`);
                })
           
	}

	render() {
	 var model = new Survey.Model(survey);
     
	 return (
     <Survey.Survey model={model} onComplete={this.onComplete.bind(this)}/>

       
        )
	}
}
