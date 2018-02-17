// deps
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


// app
import {setCategory} from '../actions/categories';
import logo from '../img/logo.svg';
import Row from './GridRow';
import AppNav from './AppNav';


class AppHeader extends Component {

    handleClick(ev) {
        const {setCategory, category} = this.props;
        return (category !== "all") ? setCategory("all") : null;
    }

    render() {

        return (
            <header className="app-header" role="banner">
                <Row margin={true}>
                    <Link
                        onClick={(ev) => this.handleClick(ev)}
                        className="app-logo-link"
                        to="/"
                        title="Token Talk homepage"
                    >
                        <img src={logo} className="app-logo" alt="logo" />
                        <h1 className="app-title">Token Talk</h1>
                    </Link>
                    <AppNav />
                </Row>
            </header>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        categories: state.categories,
        category: state.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategory: (category) => dispatch(setCategory(category))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);