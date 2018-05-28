// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';

// app
import FormCommentEdit from './FormCommentEdit';
import {setPost} from '../actions/posts';
import {setComment} from '../actions/comments';
import {apiFetch} from '../utils/api';


class PageCommentForm extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        match: {},
        url: "/comment/edit/"
    }

    getIdFromUrl() {
        const {url} = this.props,
            slashCount = url.match(/\//g).length;
        return window.location.pathname.split("/")[slashCount];
    }

    componentDidMount() {
        const {comments, getPost, getComment, posts} = this.props,
            {all: postsAll} = posts,
            {all: commentsAll, display: commentsDisplay} = comments;
        let urlId = this.getIdFromUrl(),
            commentId = (!_.isUndefined(commentsAll) && !_.isEmpty(commentsDisplay))
                ? commentsDisplay[0] : urlId;

        // update comment data, need parent Post ID
        if (_.isEmpty(commentsAll) || !commentsAll[commentId] || !commentsAll[commentId].parentId) {
            getComment(commentId);
        }

        if (commentsAll[commentId] && commentsAll[commentId].parentId && !postsAll[commentsAll[commentId].parentId]) {
            getPost(commentsAll[commentId].parentId);
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {getPost} = this.props,
            {comments: nextComments, posts: nextPosts} = nextProps,
            {all: postsAll} = nextPosts, {all: commentsAll} = nextComments;
        let urlId = this.getIdFromUrl();

        if (commentsAll[urlId] && commentsAll[urlId].parentId && !postsAll[commentsAll[urlId].parentId]) {
            getPost(commentsAll[urlId].parentId);
        }
    }

    render() {
        return (
            <main className="app-content view-comment-edit" role="main">
                <FormCommentEdit />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getComment: (id) => apiFetch({action: "comment", type: "get", body: { id }})
            .then((comment) => dispatch(setComment(comment))),
        getPost: (id) => apiFetch({action: "post", type: "get", body: { id }})
            .then((post) => dispatch(setPost(post))),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCommentForm);
