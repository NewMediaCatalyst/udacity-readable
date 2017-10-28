// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import PostList from './PostList';
import '../css/app.css';

class PageCategory extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    static defaultProps = {
        match: null
    }

    render() {
        const {category, match} = this.props;
        let type = match !== undefined && match.params.category ?
            match.params.category : "",
            title = type.toUpperCase() + " posts",
            categoryToUse = type.length > 0 ? type : category;

        return (
            <main className="app-content" role="main">
                <h1>{title}</h1>
                <PostList category={categoryToUse} />
            </main>
        );
    }
}

export default PageCategory;
