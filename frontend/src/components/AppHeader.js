// deps
import React, { Component } from 'react';
import Row from './GridRow';

// app
import logo from '../img/logo.svg';

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