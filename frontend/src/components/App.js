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
import '../css/app.css';


class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <AppNav />
                    <Switch>
                        <Route path="/" exact component={PageHome} />
                        <Route path="/posts" exact component={PageHome} />
                        <Route path="/posts/:category" component={PageCategory} />
                        <Route path="/post/edit/:id" exact component={PagePostForm} />
                        <Route path="/post/create" exact component={PagePostForm} />
                        <Route path="/post/:id" exact component={PagePost} />
                    </Switch>
                    <AppFooter />
                </div>
            </Router>
        );
    }
}

export default App;
