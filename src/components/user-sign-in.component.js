import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import './login_sign_up.css';

const transport = axios.create({
    withCredentials: true
});

export default class UserSignIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeErrorMSG = this.onChangeErrorMSG.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            error_msg: '',
            isLoggedIn: false,
        }
    }

    async getLoginStatus() {
        return await transport.post("http://localhost:5000/users/current-session");
    };

    async componentDidMount() {
        try {
            await this.getLoginStatus();
            this.setState({
                'isLoggedIn': true
            });
        } catch(err) {
            console.log(err);
            this.setState({
                'isLoggedIn': false
            });
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeErrorMSG(e) {
        this.setState({
            error_MSG: e.target._value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error_MSG: '',
        });

        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        console.log(user);

        transport.post("http://localhost:5000/users/auth", user)
            .then(res => {
                window.location = "/user/myProfile";
                console.log(res.data);
            })
            .catch(err => {
                this.setState({
                    error_MSG: "Login Failed, please try again."
                });
            });

        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        if(this.state.isLoggedIn) {
            window.location = '/user/myProfile/';
            return null;
        } else {
            return (
                <div className="outer_auth">
                    <div className="inner_auth">
                        <Form onSubmit={this.onSubmit}>
                            <h3>Sign In</h3>
                            <Form.Group controlId="username">
                                <Form.Label>Username/Email</Form.Label>
                                <Form.Control type="text"
                                              required
                                              value={this.state.username}
                                              onChange={this.onChangeUsername}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              required
                                              value={this.state.password}
                                              onChange={this.onChangePassword}
                                />
                            </Form.Group>
                            <Form.Group>
                                <input type="submit" value="Sign In" className="btn btn-dark btn-lg btn-block" />
                                {this.state.error_MSG && <p className="error"> { this.state.error_MSG } </p> }
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            )
        }
    }
}