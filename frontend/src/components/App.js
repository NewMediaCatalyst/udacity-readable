// deps
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// app
import PageHome from './PageHome';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppNav from './AppNav';
import '../css/foundation.css';
import '../css/app.css';


class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <AppNav />
                    <Route exact path="/" component={PageHome} />
                    <AppFooter />
                </div>
            </Router>
        );
    }
}

export default App;
