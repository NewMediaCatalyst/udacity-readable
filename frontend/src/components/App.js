// deps
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// app
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppNav from './AppNav';
import PageHome from './PageHome';
import PagePost from './PagePost';
import PageCategory from './PageCategory';
import PagePostForm from './PagePostForm';
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
        const {appTitle, pgTitle, appSep} = this.props;
        document.title = appTitle;
        console.log(`componentDidMount (App): ${pgTitle} :: ${appSep} :: ${appTitle}`);
    }

    componentWillUpdate(nextProps) {
        const {appTitle, pgTitle, appSep} = this.props;
        console.log(`componentWillUpdate (App): ${pgTitle} :: ${appSep} :: ${appTitle}`);
        document.title = nextProps.pgTitle ?
            nextProps.pgTitle + appSep + appTitle : appTitle
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <AppNav />
                    <Switch>
                        <Route path="/" exact component={PageHome} pgTitle="Welcome" />
                        <Route path="/posts" exact component={PageHome} pgTitle="Welcome" />
                        <Route path="/posts/:category" component={PageCategory} />
                        <Route path="/post/edit/:id" exact component={PagePostForm} />
                        <Route path="/post/create" exact component={PagePostForm} pgTitle="Create New Post" />
                        <Route path="/post/:id" exact component={PagePost} pgTitle="A post" />
                    </Switch>
                    <AppFooter />
                </div>
            </Router>
        );
    }
}

export default App;
