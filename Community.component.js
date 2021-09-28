import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import './community/community.css';
import CommunitySurveyTable from './community/survey_table/community_survey_table.component';

export default class Community extends Component {
    constructor(props) {
        super(props);

        this.onChangeShareCode = this.onChangeShareCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            share_code: '',
            err_msg: '',
        }
    }

    onChangeShareCode(e) {
        this.setState({
            share_code: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error_MSG: '',
        });

        let shareCode = {
            share_code: this.state.share_code,
        }

        axios.get(`http://localhost:5000/survey/fetchID?id=${shareCode.share_code}`)
            .then(res => {
                window.location = `/survey?id=${shareCode.share_code}`;
            })
            .catch(err => {
                this.setState({
                    error_MSG: "Could Not Find Specified Survey ID",
                    share_code: shareCode.share_code
                });
            });
    }

    showCommunity() {
        return (
            <div>
                <h1>Community Section</h1>
                <button className='survey-btns btn--primary btn--large' onClick={() => window.location = "/form"}>
                    Take a new survey!
                </button>
                <div className="inner_share">
                    <h2>Have a survey share code?</h2>
                    {this.state.error_MSG}
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="share_code">
                            <Form.Label>Share Code</Form.Label>
                            <Form.Control type="text"
                                          required
                                          value={this.state.share_code}
                                          onChange={this.onChangeShareCode}
                            />
                        </Form.Group>
                        <Form.Group>
                            <input type="submit" value="Retrieve Survey" className="btn btn-primary" />
                        </Form.Group>
                    </Form>
                </div>
                <h2>View Surveys Submitted By Other People Just Like You!</h2>
                <div>
                    <CommunitySurveyTable/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>{this.showCommunity()}</div>
        )
    }

}