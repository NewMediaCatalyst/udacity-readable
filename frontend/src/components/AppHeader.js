// deps
import React, { Component } from 'react';

// app
import logo from '../img/logo.svg';

class AppHeader extends Component {

    render() {
        return (
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <h1 className="app-title">Token Talk</h1>
            </header>
        );
    }
}

export default AppHeader;