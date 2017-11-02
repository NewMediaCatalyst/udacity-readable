// deps
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// app
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppNav from './AppNav';
import PageHome from './PageHome';
import PagePost from './PagePost';
import PageCategory from './PageCategory';
import PagePostForm from './PagePostForm';
import PageCommentForm from './PageCommentForm';
// app: actions
import {getCategories} from '../actions/categories';
import {getPostsAll} from '../actions/posts';
// app: api calls
import {apiGetCatAll} from '../utils/api-category';
import {apiGetPostsAll} from '../utils/api-posts';
// app: styles
import '../css/foundation.min.css';
import '../css/app.base.css';
import '../css/app.css';
import '../css/app.views.css';


class App extends Component {

    static defaultProps = {
        appTitle: 'Token Talk',
        appSep: ' | ',
        pgTitle: null
    }

    componentDidMount() {
        const {appTitle, getCategories, categories, getPosts, posts} = this.props;
        document.title = appTitle;

        getCategories(categories);
        getPosts(posts);

    }

    componentWillUpdate(nextProps) {
        const {appTitle, appSep} = this.props;
        document.title = nextProps.pgTitle ?
            nextProps.pgTitle + appSep + appTitle : appTitle
    }

    render() {
        let {categories} = this.props,
            links = categories.categories;
        console.log("App :: render : ", categories);

        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <AppNav links={links} />
                    <Switch>
                        <Route path="/" exact component={PageHome} pgTitle="Welcome" />
                        <Route path="/posts" exact component={PageHome} pgTitle="Welcome" />
                        <Route path="/posts/:category" component={PageCategory} />
                        <Route path="/post/edit/:id" exact component={PagePostForm} />
                        <Route path="/post/create" exact component={PagePostForm} pgTitle="Create New Post" />
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
        posts: state.posts,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (categories) => {
            return apiGetCatAll().then((categories) => (dispatch(getCategories(categories))))
        },
        getPosts: (posts) => {
            return apiGetPostsAll().then((posts) => (dispatch(getPostsAll(posts))))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
