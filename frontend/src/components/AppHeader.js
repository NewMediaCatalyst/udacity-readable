// deps
import React, { Component } from 'react';

// app
import logo from '../img/logo.svg';
import Row from './GridRow';


class AppHeader extends Component {

    render() {
        return (
            <header className="app-header" role="banner">
                <Row margin={true}>
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">Token Talk</h1>
                </Row>
            </header>
        );
    }
}

export default AppHeader;