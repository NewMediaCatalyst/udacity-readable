// deps
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// app
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import PageHome from './PageHome';
import PagePost from './PagePost';
import PageCommentForm from './PageCommentForm';
// app: actions
import {getCategories} from '../actions/categories';
import {setPageTitle} from '../actions/meta';
// app: api calls
import {apiGetCatAll} from '../utils/api-category';
// app: styles
import '../css/foundation.min.css';
import '../css/app.base.css';
import '../css/app.css';
import '../css/app.views.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isTop: true };
    }

    static propTypes = {
        categories: PropTypes.object.isRequired
    }

    static defaultProps = {
        title: {
            app: "Token Talk",
            sep: " | ",
            page: "Welcome",
        },
        categories: {}
    }

    componentDidMount() {
        const {title, setPageTitle, getCategories, categories} = this.props,
            {app, sep, page} = title;

        document.addEventListener('scroll', () => {
            let {scrollY: scrollTopPos} = window, nearTop = scrollTopPos < 50;
            if (nearTop !== this.state.isTop) { this.setState({ isTop: nearTop }); }
        });

        setPageTitle(title);
        document.title = page + sep + app;  // set <title>
        getCategories(categories);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {isTop: curIsTop} = this.state, {isTop: nextIsTop} = nextState;
        return curIsTop !== nextIsTop
    }

    componentWillReceiveProps(nextProps) {
        const {meta} = nextProps, {app, page, sep} = meta.title;
        document.title = page.length > 0 ? page + sep + app : app;  // update <title>
    }

    render() {
        let appClasses = classnames({
                "app": true,
                "is-top": this.state.isTop
            });

        return (
            <Router>
                <div className={appClasses}>
                    <AppHeader />
                    <Switch>
                        <Route path="/" exact component={PageHome} />
                        <Route path="/posts" exact component={PageHome} />
                        <Route path="/posts/:category" component={PageHome} />
                        <Route path="/post/create" exact component={PagePost} />
                        <Route path="/post/edit/:id" exact component={PagePost} />
                        <Route path="/:category/:id" exact component={PagePost} />
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
        meta: state.meta
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (categories) => apiGetCatAll()
            .then((categories) => (dispatch(getCategories(categories)))),
        setPageTitle: (title) => (dispatch(setPageTitle(title)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
