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
import {getPostsAll, filterPostsByCat} from '../actions/posts';
// app: api calls
import {apiGetCatAll} from '../utils/api-category';
import {apiGetPostsAll} from '../utils/api-posts';
// app: styles
import '../css/foundation.min.css';
import '../css/app.base.css';
import '../css/app.css';
import '../css/app.views.css';


class App extends Component {

    static propTypes = {
        match: PropTypes.object,
        posts: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired
    }

    static defaultProps = {
        appTitle: "Token Talk",
        appSep: " | ",
        pgTitle: "Welcome",
        category: "all",
        categories: {},
        match: { params: undefined },
        posts: {}
    }


    componentDidMount() {
        const { appTitle, getCategories, categories, getPosts, posts} = this.props;
        document.title = appTitle;
        getCategories(categories);
        getPosts(posts);
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
        categories: state.categories,
        category: state.category,
        posts: state.posts,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filterPostsByCat: (category) => dispatch(filterPostsByCat(category)),
        getCategories: (categories) => {
            return apiGetCatAll().then((categories) => (dispatch(getCategories(categories))))
        },
        getPosts: (posts) => {
            return apiGetPostsAll().then((posts) => (dispatch(getPostsAll(posts))))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
