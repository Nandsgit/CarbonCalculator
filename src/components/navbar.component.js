import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import {Button, ButtonGroup, Nav, NavDropdown} from "react-bootstrap";
import axios from "axios";
import '../App.css';

const transport = axios.create({
    withCredentials: true
});

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            isLoggedIn: false,
        }
    }

    async getProfile() {
        return await transport.post("http://localhost:5000/users/current-session");
    };

    async componentDidMount() {
        try {
            this.getProfile()
                .then(res => {
                    console.log(res);
                    this.setState({
                        username: res.data.username,
                        isLoggedIn: true,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        username: 'anonymous',
                        isLoggedIn: false,
                    });
                });
        } catch(err) {
            console.log(err);
        }
    }

    retrieveLoginStatus() {
        return this.state.isLoggedIn;
    }

    renderLoginLogoutSystem() {
        if(this.retrieveLoginStatus()) {
            return (
                <NavDropdown alignRight title="My Account" id="dropdown-menu-align-right">
                    <NavDropdown.Item disabled>
                        Logged in as {this.state.username}.
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/user/myProfile">
                        My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/user/logout">
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>
            );
        } else {
            return (
                <div>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="outline-info" href="/user/sign_up/">Sign Up!</Button>

                        <Dropdown.Toggle split variant="outline-info" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item href="/user/sign_in/">Sign In!</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            );
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
                <Navbar.Brand href="/">Carbon Footprint Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/form">Emissions Survey</Nav.Link>
                        <Nav.Link href="/community">Community</Nav.Link>
                        <Nav.Link href="/feedback">Feedback</Nav.Link>
                    </Nav>
                    <Nav alignRight>
                        {this.renderLoginLogoutSystem()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
