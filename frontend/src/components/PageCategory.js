// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// app
import PostList from './PostList';
// import {capitalize} from '../utils/data';
import '../css/app.css';


class PageCategory extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired
    }

    static defaultProps = {
        categories: {},
        match: {},
        posts: {}
    }

    render() {
        const {match, posts, categories} = this.props;
        let type = match.params.category !== undefined ? match.params.category : "",
            title = (categories.length > 0) ? categories.forEach((cat) => {
                console.log("cat: ", cat);
                return (cat.ticker === type) ? cat.ticker : "Posts";
            }) : "Posts";
            // title = capitalize(title) + " posts";

        return (
            <main className="app-content" role="main">
                <h1>{title}</h1>
                <PostList posts={posts} category={type} />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(PageCategory);
