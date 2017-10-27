// libs
import React, { Component } from 'react';
import uuidV4 from 'uuid.v4';
import PropTypes from 'prop-types';

// app
import Post from './Post';
import FormCommentCreate from './FormCommentCreate';


class PagePost extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    static defaultProps = {
        pgTitle: 'Post',
        match: null
    }

    // TODO: replace use of uuid generation
    state = {
        postID: uuidV4()
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle} = this.props;
        console.log(`componentDidMount (PagePost): ${pgTitle} :: ${appSep} :: ${appTitle}`);
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        let {postID} = this.state,
            {match} = this.props,
            idToUse = (match.params.id !== undefined && match.params.id.length > 0) ?
                match.params.id : postID;

        return (
            <main className="app-content" role="main">
                <Post postID={idToUse} />
                <FormCommentCreate postID={idToUse} />
            </main>
        );
    }
}

export default PagePost;
