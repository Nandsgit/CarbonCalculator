import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const transport = axios.create({
    withCredentials: true
});

export default class Survey_Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            surveyResults: '',
            data: '',
            processedSurveyData: '',
            recommendations: '',
            username: 'Anonymous',
            isLoggedIn: false,
            error: false,
            error_msg: '',
            isLoading: true,
        };
    }

    async requestSurveyResult() {
        let data = '';
        let res = await axios.get(`http://localhost:5000/survey/fetchID?id=${this.state._id}`);
        if(res.status === 404) throw "Cannot Find";
        console.log('response survey' + JSON.stringify(res.data));
        data = res.data;
        return data;
    }

    async requestRecommendations() {
        let recommendations = '';
        let res = await axios.get(`http://localhost:5000/survey/calculateRecommendations?id=${this.state._id}`);
        if(res.status === 404) throw "Cannot Find";
        console.log('response recommendation' + res.data);
        recommendations = res.data;
        return recommendations;
    }

    async getProfile() {
        transport.post("http://localhost:5000/users/current-session")
            .then(res => {
                console.log(res);
                this.setState({
                    username: res.data.username,
                    isLoggedIn: true,
                });
            })
            .catch(err => {
                this.setState({
                    username: 'Anonymous',
                    isLoggedIn: false,
                });
            });
    };

    async componentDidMount() {
        try {
            // get survey id from url
            const queryString = window.location.search;
            const surveyID = new URLSearchParams(queryString);
            const parsedSurveyID = surveyID.get("id");
            await this.setState({
                _id: parsedSurveyID,
            });

            // get data from server
            console.log("get data from server")
            let data = await this.requestSurveyResult();
            await this.setState({
                data: data,
                processedSurveyData: this.get_data(data),
            });
            console.log("Hi" + this.state.processedSurveyData);

            // get recommendations from server
            let recommendations = await this.requestRecommendations();
            let processedRecommendations = [];
            recommendations.forEach(element => {
                processedRecommendations.push(element[1]);
            });
            await this.setState({
                recommendations: processedRecommendations,
            });

            // check logged in user
            await this.getProfile();
        } catch (e) {
            await this.setState({
                error: true,
                error_msg: e.message,
            });
        }
        finally {
            await this.setState({
                isLoading: false,
            });
        }

    }

    get_data(result){
        const transportation = result.form_vals.Q4+result.form_vals.Q6+result.form_vals.Q7+result.form_vals.Q8
        const electricity = result.form_vals.Q9
        const natural_gas = result.form_vals.Q10
        const beef = result.form_vals.Q11
        const pork = result.form_vals.Q12
        const poultry = result.form_vals.Q13
        const lamb = result.form_vals.Q14
        const seafood = result.form_vals.Q15
        const recycling = result.form_vals.Q16
        const data = {
            labels: [
                'Transportation',
                'Electricity',
                'Natural Gas',
                'Beef Consumption',
                'Pork Consumption',
                'Poultry Consumption',
                'Lamb Consumption',
                'Seafood Consumption',
                'Recycling'
            ],
            datasets: [{
                label: "CO2 Emission Breakdown",
                data:[
                    transportation,
                    electricity,
                    natural_gas,
                    beef,
                    pork,
                    poultry,
                    lamb,
                    seafood,
                    recycling],
                backgroundColor: [
                    '#00876c',
                    '#489a68',
                    '#78ab63',
                    '#a8ba61',
                    '#dac767',
                    '#dfa850',
                    '#e18745',
                    '#de6347',
                    '#d43d51'],
                hoverOffset: 4
            }]
        };


        return data
    }

    comparison(total){
        const diff = 7.5-total

        if (diff > 1){
            const sentence = "That is " + Math.round((diff*1000 + Number.EPSILON))/1000+ " metric tons less than the average American. Good work!"
            return sentence
        }else if (diff < 1){
            const sentence = "That is " + Math.round((diff*-1000+Number.EPSILON))/1000 + " metric tons more than the average American."
            return sentence
        }else{
            const sentence = "That is exactly the same amount as the average American."
            return sentence
        }

    }

    checkIfUserWithSurvey() {
        return this.state.isLoggedIn;
    }

    checkSurveyQ16() {
        if(this.state.data.form.Q16) {
            return "I do recycle";
        } else {
            return "I do not recycle.";
        }
    }

    checkSurveyQ4() {
        if(this.state.data.form.Q3 > 0) {
            return (
                <tr>
                    <td>How many miles do you drive them in a week total?</td>
                    <td>{this.state.data.form.Q4}</td>
                </tr>
            )
        } else {
            return null;
        }
    }

    checkSurveyQ6() {
        if(this.state.data.form.Q5 > 0) {
            return (
                <tr>
                    <td>How many miles do you drive them in a week total?</td>
                    <td>{this.state.data.form.Q6}</td>
                </tr>
            )
        } else {
            return null;
        }
    }

    showSurveyResponses() {
        if(this.checkIfUserWithSurvey()) {
            return this.outputSurveyDataTable();
        } else {
            return "Please register for a free account to see this section.";
        }
    }

    outputSurveyDataTable() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>Question</th>
                        <th>Your Response</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>What country are you from?</td>
                        <td>Withheld</td>
                    </tr>
                    <tr>
                        <td>How many people are in {this.state.data.username}'s household?</td>
                        <td>{this.state.data.form.Q2}</td>
                    </tr>
                    <tr>
                        <td>How many gas-powered vehicles does {this.state.data.username} own?</td>
                        <td>{this.state.data.form.Q3}</td>
                    </tr>
                    {this.checkSurveyQ4()}
                    <tr>
                        <td>How many electric vehicles does {this.state.data.username} own?</td>
                        <td>{this.state.data.form.Q5}</td>
                    </tr>
                    {this.checkSurveyQ6()}
                    <tr>
                        <td>How many miles does {this.state.data.username} use public transit in a week total?</td>
                        <td>{this.state.data.form.Q7}</td>
                    </tr>
                    <tr>
                        <td>How many miles does {this.state.data.username} fly by air on average every year?</td>
                        <td>{this.state.data.form.Q8}</td>
                    </tr>
                    <tr>
                        <td>How much is {this.state.data.username}'s electricity bill on average per month?</td>
                        <td>{this.state.data.form.Q9}</td>
                    </tr>
                    <tr>
                        <td>How much is {this.state.data.username}'s natural gas bill on average per month?</td>
                        <td>{this.state.data.form.Q10}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of beef does {this.state.data.username}'s household consume per week?</td>
                        <td>{this.state.data.form.Q11}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of pork does {this.state.data.username}'s household consume per week?</td>
                        <td>{this.state.data.form.Q12}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of chicken/poultry does {this.state.data.username}'s household consume per week?</td>
                        <td>{this.state.data.form.Q13}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of lamb does {this.state.data.username}'s household consume per week?</td>
                        <td>{this.state.data.form.Q14}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of seafood does {this.state.data.username}'s household consume per week?</td>
                        <td>{this.state.data.form.Q15}</td>
                    </tr>
                    <tr>
                        <td>Does {this.state.data.username} recycle?</td>
                        <td>{this.checkSurveyQ16()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    showRecommendations() {
        if(this.checkIfUserWithSurvey()) {
            return this.outputRecommendationsTable();
        } else {
            return "Please register for a free account to see this section.";
        }
    }

    outputRecommendationsTableRow() {
        if(Array.isArray(this.state.recommendations)) {
            return this.state.recommendations.map((recommendation,index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{recommendation}</td>
                    </tr>
                )
            })
        } else {
            return null;
        }
    }

    outputRecommendationsTable() {
        if(this.state.recommendations.length !== 0) {
            return (
                <div className="table-responsive">
                    <p>We have found a few recommendations for {this.state.data.username} based on the your survey responses.</p>
                    <p>Please look at the table below.</p>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Impact Rank On Emission</th>
                            <th>Recommendation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.outputRecommendationsTableRow()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    Based on the survey responses, we have not found recommendations for {this.state.data.username}.
                </div>
            )
        }
    }

    shareResult() {
        return(
            <div>
                <p>Share your result using either the share code or the survey link.</p>
                <p>Share Code: {this.state._id}</p>
                <p>Survey Link: http://localhost:3000/survey?id={this.state._id}</p>
            </div>
        )
    }

    render() {
        const comp = this.comparison(this.state.data.co2)
        console.log(comp)
        if(this.state.isLoading) {
            return (
                <ReactBootStrap.Spinner animation='border' />
            );
        } else {
            if(this.state.error) {
                if(this.state.error_msg === "Request failed with status code 404") {
                    return (
                        <div>
                            <h1>This is embarrassing.</h1>
                            <p>We could not find the requested survey on the server.</p>
                            <p>Click <a href='/'>here</a> to head back to the homepage.</p>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <h1>This is embarrassing.</h1>
                            <p>We're sorry. Something went very wrong on our end when handling the request.</p>
                            <p>Try refreshing the page again or click <a href='/'>here</a> to go to the homepage.</p>
                        </div>
                    );
                }
            } else {
                return (
                    <div>
                        <h1>This survey was taken by: {this.state.data.username}!</h1>
                        <br></br>
                        <h3>{this.state.data.username} was estimated to emit {this.state.data.co2} metric tons of carbon dioxide a year.</h3>
                        <br></br>
                        <h3>{comp}</h3>
                        <br/>
                        <h2>Share your result with others!</h2>
                        {this.shareResult()}
                        <br/>
                        <Doughnut data={this.state.processedSurveyData} />
                        <div>
                            <h1>Survey Recommendations</h1>
                            {this.showRecommendations()}
                        </div>
                        <div>
                            <h1>Survey Response</h1>
                            {this.showSurveyResponses()}
                        </div>
                    </div>
                )
            }
        }
    }
}