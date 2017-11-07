// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// app
import '../css/app.css';
import PostList from './PostList';
import FilterLinks from './FilterLinks';
import {capitalize} from '../utils/helpers';
import {setCategory} from '../actions/categories';
import {filterPostsByCat, showAllPosts} from '../actions/posts';

class PageHome extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired,
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        pgTitle: "Welcome",
        category: "all",
        categories: {},
        posts: {},
        match: { params: undefined }
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle, match, category, setCategory} = this.props;

        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle;

        // required for setting initial navigation and settings
        (!_.isUndefined(match.params) && !_.isUndefined(match.params.category))
            ? setCategory(match.params.category)
            : setCategory(category);
    }

    render() {
        const {pgTitle, posts, category, categories} = this.props;
        let catObj, hdrTitle = pgTitle;

        if (!_.isUndefined(categories.categories) && category !== "all") {
            catObj = Object.values(categories.categories).filter(item => item.ticker === category)[0];
            hdrTitle = (!_.isUndefined(catObj.name)) ? capitalize(catObj.name) + " posts" : "Posts";
        }


        return (
            <main className="app-content" role="main">
                <h1>{hdrTitle}</h1>
                <FilterLinks />
                <PostList posts={posts} category={category} />
            </main>
        );
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories,
        category: state.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategory: (category) => dispatch(setCategory(category)),
        filterPostsByCat: (category) => dispatch(filterPostsByCat(category)),
        showAllPosts: (category) => dispatch(showAllPosts(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
