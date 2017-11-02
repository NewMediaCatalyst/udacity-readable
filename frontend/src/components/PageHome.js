// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';

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
        const {pgTitle, posts} = this.props;

        return (
            <main className="app-content" role="main">
                <h1>{pgTitle}</h1>
                <PostList posts={posts} category="all" />
            </main>
        );
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

PageHome = connect(mapStateToProps, mapDispatchToProps)(PageHome);

export default PageHome;
