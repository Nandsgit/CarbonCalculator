import React, {Component} from 'react';
import axios from 'axios';
import Moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import {Link} from "react-router-dom";

const transport = axios.create({
    withCredentials: true
});

export default class SurveyResultTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            error_MSG: '',
            survey_results: '',
            loading: false,
        }
    }

    async componentDidMount() {
        try {
            let userStatus = await this.getProfile();
            await this.setState({
                'username': userStatus.data.username
            });
            if(this.state.username === "Access Denied") {
                await this.setState({
                    'error_MSG': "Not Logged In"
                })
                return this.state.error_MSG;
            }
            // fetch data
            let surveyResults = await this.fetchSurveyResult();
            await this.setState({
                'survey_results': surveyResults.data,
                'loading': true,
            });
        } catch(err) {
            console.log(err);
        }
    }

    async getProfile() {
        return await transport.post("http://localhost:5000/users/current-session");
    };

    async fetchSurveyResult() {
        const username = {
            username: this.state.username,
        }
        return await transport.post("http://localhost:5000/survey/fetchAllSurveys", username);
    }

     compileSurveyResults() {
        if(Array.isArray(this.state.survey_results)) {
            let survey_results_array = [];
            this.state.survey_results.map((survey) => {
                const { _id, co2, createdAt } = survey //destructuring
                console.log(createdAt);
                let createdDate = "";
                if(createdAt !== undefined) {
                    createdDate = Moment(createdAt).format('MM-DD-YYYY');
                }
                survey_results_array.push({
                    "id": _id,
                    "createdDate": createdDate,
                    "co2": co2,
                    "survey_link": <Link to={`/form_result?result=${_id}`}> View Survey and Recommendations </Link>
                });
            });
            return survey_results_array;
        } else {
            return [];
        }
    }

     setColumns() {
        return(
            [
                {dataField: "createdDate", text: "Date"},
                {dataField: "co2", text: "CO2 (in metric tons)"},
                {dataField: "survey_link", text: "Survey and Recommendations"},
            ]
        );
    }

    render() {
        Moment.locale('en');
        return (
            //this.showTable()
            <div>
                {
                    this.state.loading ?
                    ( <BootstrapTable
                        wrapperClasses={'table-striped'}
                        headerWrapperClasses={'thead-dark'}
                        keyField="id"
                        data={this.compileSurveyResults()}
                        columns={this.setColumns()}
                        pagination={ paginationFactory() }
                    /> ) : ( <ReactBootStrap.Spinner animation='border' />)
                }
            </div>
        )
    }
}