// libs
import React, { Component } from 'react';

// app
import '../css/app.css';
import PostList from './PostList';

class PageHome extends Component {

    static defaultProps = {
        pgTitle: 'Welcome'
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle} = this.props;
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        const {pgTitle} = this.props;

        return (
            <main className="app-content" role="main">
                <h1>{pgTitle}</h1>
                <PostList category="all" />
            </main>
        );
    }
}

export default PageHome;
