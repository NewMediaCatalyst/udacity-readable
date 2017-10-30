// libs
import React, { Component } from 'react';
import uuidV4 from 'uuid.v4';
import PropTypes from 'prop-types';

// app
import Post from './Post';
import CommentList from './CommentList';
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
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        let {postID} = this.state, // TODO: remove postID from state
            {match} = this.props,
            idToUse = (match.params.id !== undefined && match.params.id.length > 0) ?
                match.params.id : postID;

        return (
            <main className="app-content" role="main">
                <Post postID={idToUse} />
                <CommentList postID={idToUse} />
                <FormCommentCreate postID={idToUse} />
            </main>
        );
    }
}

export default PagePost;
