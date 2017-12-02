// deps
import React, { Component } from 'react';

// app
import Row from './GridRow';


class AppFooter extends Component {

    render() {
        return (
            <footer className="app-footer" role="contentinfo">
                <Row>
                    <p>&copy; Copyright 2017 Token Talk</p>
                </Row>
            </footer>
        );
    }
}

export default AppFooter;