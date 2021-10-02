import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const transport = axios.create({
    withCredentials: true
});

export default class Form_Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            surveyResults: '',
            data: '',
            processedSurveyData: '',
            recommendations: '',
            username: 'Anonymous',
            isLoggedIn: true,
            error: false,
            error_msg: '',
            isLoading: true,
        };
    }

    async requestSurveyResult() {
        let data = '';
        let res = await axios.get(`http://localhost:5000/survey/fetchID?id=${this.state._id}`);
        console.log('response' + res.data);
        data = res.data;
        return data;
    }

    async requestRecommendations() {
        let recommendations = '';
        let res = await axios.get(`http://localhost:5000/survey/calculateRecommendations?id=${this.state._id}`);
        console.log('response' + res.data);
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
            const parsedSurveyID = surveyID.get("result");
            await this.setState({
                _id: parsedSurveyID,
            });

            // read info from session storage -> if it exists
            const surveyResults = sessionStorage.getItem("surveyData");
            let parsedSessionStorageSurveyResults = {
                _id: '',
            };
            if(surveyResults !== null) {
                parsedSessionStorageSurveyResults = JSON.parse(surveyResults);
            }

            // check if info in session storage match requested data
            if(this.state._id === parsedSessionStorageSurveyResults._id) {
                // parse data from session storage if session storage data matches requested info
                console.log("get data from session storage")
                let processedSurvey = this.get_data(parsedSessionStorageSurveyResults);
                await this.setState({
                    data: parsedSessionStorageSurveyResults,
                    processedSurveyData: processedSurvey,
                });
                console.log(this.state.processedSurveyData);
            } else {
                // get data from server
                console.log("get data from server")
                let data = await this.requestSurveyResult();
                await this.setState({
                    data: data,
                    processedSurveyData: this.get_data(data),
                });
                console.log("Hi" + this.state.processedSurveyData);
            }

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
            console.log('Error' + JSON.stringify(e));
            await this.setState({
                error: true,
                error_msg: e.message,
            })
        } finally {
            await this.setState({
                isLoading: false,
            })
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
                hoverOffset: 4,
            }],
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

    request_account_creation(name){
        if (name === 'Anonymous'){
            return (<h3>You can look at the breakdown by category below, or create an account <a href="http://localhost:3000/user/sign_up/">here</a> so your future survey results are logged and you will be able to view recommendations to reduce your emissions and keep track of your results.</h3>);
        }else{
            return (<h3>You can look at the breakdown by category below, or scroll down to view recommendations to reduce your emissions and keep track of your results.</h3>);
        }
    }

    checkIfUserWithSurvey() {
        if(this.state.isLoggedIn) {
            return this.state.username === this.state.data.username;
        }
        return false;
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
            return "Registered Users Exclusive Feature";
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
                        <td>{this.state.data.form.Q1}</td>
                    </tr>
                    <tr>
                        <td>How many people are in your household?</td>
                        <td>{this.state.data.form.Q2}</td>
                    </tr>
                    <tr>
                        <td>How many gas-powered vehicles do you own?</td>
                        <td>{this.state.data.form.Q3}</td>
                    </tr>
                    {this.checkSurveyQ4()}
                    <tr>
                        <td>How many electric vehicles do you own?</td>
                        <td>{this.state.data.form.Q5}</td>
                    </tr>
                    {this.checkSurveyQ6()}
                    <tr>
                        <td>How many miles do you use public transit in a week total?</td>
                        <td>{this.state.data.form.Q7}</td>
                    </tr>
                    <tr>
                        <td>How many miles do you fly by air on average every year?</td>
                        <td>{this.state.data.form.Q8}</td>
                    </tr>
                    <tr>
                        <td>How much is your electricity bill on average per month?</td>
                        <td>{this.state.data.form.Q9}</td>
                    </tr>
                    <tr>
                        <td>How much is your natural gas bill on average per month?</td>
                        <td>{this.state.data.form.Q10}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of beef does your household consume per week?</td>
                        <td>{this.state.data.form.Q11}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of pork does your household consume per week?</td>
                        <td>{this.state.data.form.Q12}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of chicken/poultry does your household you consume per week?</td>
                        <td>{this.state.data.form.Q13}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of lamb does your household consume per week?</td>
                        <td>{this.state.data.form.Q14}</td>
                    </tr>
                    <tr>
                        <td>How many pounds of seafood does your household consume per week?</td>
                        <td>{this.state.data.form.Q15}</td>
                    </tr>
                    <tr>
                        <td>Do you recycle?</td>
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
            return "Registered Users Exclusive Feature";
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
                    <p>We have found a few recommendations for you based on the your survey responses.</p>
                    <p>Please look at the table below.</p>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Impact Rank On Your Emission</th>
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
                    Based on your survey responses, we have not found recommendations for you. Just keep doing what you are doing.
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
            )
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
                        <h1>Thanks for taking the survey, {this.state.data.username}!</h1>
                        <br></br>
                        <h3>You are estimated to emit {this.state.data.co2} metric tons of carbon dioxide a year.</h3>
                        <br></br>
                        <br></br>
                        <h3>{comp}</h3>
                        <br></br>
                        <br/>
                        <h2>Share your result with others!</h2>
                        {this.shareResult()}
                        <br/>
                        {this.request_account_creation(this.state.data.username)}
                        <Doughnut data={this.state.processedSurveyData} />
                        <div>
                            <h1>Your Recommendations</h1>
                            {this.showRecommendations()}
                        </div>
                        <div>
                            <h1>Your Survey Response</h1>
                            {this.showSurveyResponses()}
                        </div>
                    </div>
                )
            }
        }
	}
}
