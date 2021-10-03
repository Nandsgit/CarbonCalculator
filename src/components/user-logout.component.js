import React, { Component } from 'react';
import axios from 'axios';
const transport = axios.create({
    withCredentials: true
});

export default class UserLogout extends Component {
    constructor(props) {
        super(props);

        this.logout();
    }

    logout() {
        transport.post("http://localhost:5000/users/logout")
            .then(res => {
                console.log("User Logged Out");

            })
            .catch(res => {
                console.log("User Logged Out");

            });
        window.location = "/";
    }

    render() {
        return(
            <div>
                {this.logout()}
            </div>
        );
    }
}