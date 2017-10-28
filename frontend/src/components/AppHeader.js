// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// app
import logo from '../img/logo.svg';
import Row from './GridRow';


class AppHeader extends Component {

    render() {
        return (
            <header className="app-header" role="banner">
                <Row margin={true}>
                    <Link to="/" title="Token Talk homepage">
                        <img src={logo} className="app-logo" alt="logo" />
                        <h1 className="app-title">Token Talk</h1>
                    </Link>
                </Row>
            </header>
        );
    }
}

export default AppHeader;