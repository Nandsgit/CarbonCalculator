import React, {Component} from 'react';
import axios from 'axios';
import './myprofile/button.css';
import './myprofile/myprofile.css';
import SurveyResultTable from './myprofile/survey_result_table/survey_result_table.component';

const transport = axios.create({
    withCredentials: true
});

export default class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            error_MSG: '',
            isLoggedIn: false,
        }
    }

    async componentDidMount() {
        try {
            let userStatus = await this.getProfile();
            this.setState({
                'username': userStatus.data.username,
                'isLoggedIn': true,
            });
        } catch(err) {
            console.log(err);
            this.setState({
                'username': "Anonymous",
                'isLoggedIn': false
            })
        }
    }

    async getProfile() {
        return await transport.post("http://localhost:5000/users/current-session");
    };

    showProfile() {
        if(!this.state.isLoggedIn && this.state.username === "Anonymous") {
            window.location = "/user/sign_in/";
        } else {
            return (
                <div>
                    <h1>Your Profile Page</h1>
                    <button className='survey-btns btn--primary btn--large' onClick={() => window.location = "/form"}>
                        Take a new survey!
                    </button>
                    <br/>
                    <div>
                        <h1>Previous Surveys</h1>
                        <SurveyResultTable/>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>{this.showProfile()}</div>
        )
    }

}