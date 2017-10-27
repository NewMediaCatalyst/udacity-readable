// libs
import React, { Component } from 'react';

// app
import '../css/app.css';
// import FormCommentCreate from './FormCommentCreate';

class PageHome extends Component {

    static defaultProps = {
        pgTitle: 'Welcome'
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle} = this.props;
        console.log(`componentDidMount (PageHome): ${pgTitle} :: ${appSep} :: ${appTitle}`);
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        return (
            <main className="app-content" role="main">
                <h1>Welcome</h1>
            </main>
        );
    }
}

export default PageHome;
