import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import Form from 'react-bootstrap/Form'
import './login_sign_up.css';
const transport = axios.create({
    withCredentials: true
});

export default class UserSignUp extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            response_message: '',
            error_MSG: '',
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

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
        this.validateEmail();
    }

    validateEmail() {
        let email = this.state.email;
        if (validator.isEmail(email)) {
            console.log("Is Email");
            return true;
        } else {
            console.log("Not Email");
            return false;
        }
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error_MSG: ''
        });

        if(!this.validateEmail()) {
            this.setState({
                error_MSG: "Not a Valid Email",
            });
        } else {
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }

            console.log(user);

            axios.post("http://localhost:5000/users/register", user)
                .then(res => {
                    let message = "User Registered Successfully."
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        response_message: message,
                        error_MSG: '',
                    });
                })
                .catch(err => {
                    this.setState({
                        error_MSG: err.response.data,
                        response_message: '',
                    });
                });
        }
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
                            <h3>Register</h3>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                              required
                                              value={this.state.username}
                                              onChange={this.onChangeUsername}
                                />
                                <Form.Text className="text-muted">
                                    Username will be visible to everyone and cannot be changed once set.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text"
                                              required
                                              value={this.state.email}
                                              onChange={this.onChangeEmail}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              required
                                              value={this.state.password}
                                              onChange={this.onChangePassword}
                                />
                                <Form.Text className="text-muted">
                                    Password length should be 8 characters or longer.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="sign_up">
                                <input type="submit" value="Register Account" className="btn btn-dark btn-lg btn-block" />
                                <p className="forgot-password text-right">
                                    Already registered? <a href="/user/sign_in">Click here to log in.</a>
                                </p>
                                {this.state.error_MSG && <p className="error"> { this.state.error_MSG } </p> }
                                {this.state.response_message && <p className="response"> { this.state.response_message } </p>}
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            )
        }
    }
}