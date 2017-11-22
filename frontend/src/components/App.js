// deps
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

// app
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppNav from './AppNav';
import PageHome from './PageHome';
import PagePost from './PagePost';
import PageCommentForm from './PageCommentForm';
// app: actions
import {getCategories} from '../actions/categories';
// app: api calls
import {apiGetCatAll} from '../utils/api-category';
// app: styles
import '../css/foundation.min.css';
import '../css/app.base.css';
import '../css/app.css';
import '../css/app.views.css';


class App extends Component {

    static propTypes = {

        categories: PropTypes.object.isRequired
    }

    static defaultProps = {
        appTitle: "Token Talk",
        appSep: " | ",
        pgTitle: "Welcome",
        categories: {}
    }

    componentDidMount() {
        const { appTitle, getCategories, categories} = this.props;
        document.title = appTitle;
        getCategories(categories);
    }

    componentWillUpdate(nextProps) {
        const {appTitle, appSep} = this.props;

        document.title = nextProps.pgTitle ?
            nextProps.pgTitle + appSep + appTitle : appTitle;
    }

    render() {
        let {categories} = this.props,
            links = categories.categories;

        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <AppNav links={links} />
                    <Switch>
                        <Route path="/" exact component={PageHome} />
                        <Route path="/posts" exact component={PageHome} />
                        <Route path="/posts/:category" component={PageHome} />
                        <Route path="/post/edit/:id" exact component={PagePost} />
                        <Route path="/post/create" exact component={PagePost} pgTitle="Create New Post" />
                        <Route path="/post/:id" exact component={PagePost} pgTitle="A post" />
                        <Route path="/comment/edit/:id" exact component={PageCommentForm} />
                    </Switch>
                    <AppFooter />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (categories) => apiGetCatAll()
            .then((categories) => (dispatch(getCategories(categories))))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
