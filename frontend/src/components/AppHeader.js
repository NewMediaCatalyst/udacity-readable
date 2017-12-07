// deps
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


// app
import logo from '../img/logo.svg';
import Row from './GridRow';
import AppNav from './AppNav';


class AppHeader extends Component {

    render() {
        const {categories} = this.props, links = categories.categories;

        return (
            <header className="app-header" role="banner">
                <Row margin={true}>
                    <Link className="app-logo-link" to="/" title="Token Talk homepage">
                        <img src={logo} className="app-logo" alt="logo" />
                        <h1 className="app-title">Token Talk</h1>
                    </Link>
                    <AppNav links={links} />
                </Row>
            </header>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        categories: state.categories
    };
}


export default connect(mapStateToProps)(AppHeader);