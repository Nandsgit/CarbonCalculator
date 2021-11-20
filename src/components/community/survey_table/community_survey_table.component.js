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

export default class CommunitySurveyTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey_results: '',
            loading: false,
        }
    }

    async componentDidMount() {
        try {
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

    async fetchSurveyResult() {
        return await transport.post("http://localhost:5000/survey/global/fetchAllSurveys");
    }

     compileSurveyResults() {
        if(Array.isArray(this.state.survey_results)) {
            let survey_results_array = [];
            this.state.survey_results.map((survey) => {
                const { _id, co2, createdAt, username } = survey //destructuring
                console.log(createdAt);
                let createdDate = "";
                if(createdAt !== undefined) {
                    createdDate = Moment(createdAt).format('MM-DD-YYYY');
                }
                survey_results_array.push({
                    "id": _id,
                    "username": username,
                    "createdDate": createdDate,
                    "co2": co2,
                    "survey_link": <Link to={`/survey?id=${_id}`}> View Survey and Recommendations </Link>
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
                {dataField: "username", text: "Username"},
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