// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// app
import Post from './Post';
import CommentList from './CommentList';
import FormCommentCreate from './FormCommentCreate';
import FormPostCreate from './FormPostCreate';
import FormPostEdit from './FormPostEdit';
import {getPost} from '../actions/posts';
import {apiFetch} from '../utils/api';
import {whichPostAction} from '../utils/helpers';


class PagePost extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        pgTitle: 'Post',
        match: {}
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle, getPost, match} = this.props;
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle;

        if (match && typeof match.params.id !== 'undefined') {
            getPost(match.params.id);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {match} = this.props;
        return nextProps.match !== match;
    }

    renderPost() {
        const {match} = this.props;
        let action =  whichPostAction(match);
        switch (action) {
            case "edit": return (
                <main className="app-content" role="main">
                    <FormPostEdit />
                </main>
            );
            case "create": return (
                <main className="app-content" role="main">
                    <FormPostCreate />
                </main>
            );
            default: return (
                <main className="app-content" role="main">
                    <Post /><CommentList /><FormCommentCreate />
                </main>
            );
        }

    }

    renderNoPost() {
        const {match} = this.props;
        let action =  whichPostAction(match);
        return (
            <main className="app-content" role="main">
                <h1 className="post-title">Oops!</h1>
                <p className="no-results">{`Something went wrong! Unable to ${action} post`}</p>
            </main>
        );
    }

    render() {
        const {post} = this.props;
        return (post.details) ? this.renderPost() : this.renderNoPost();
    }
}

function mapStateToProps(state, props) {
    return {
        post: state.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => {
            return apiFetch({action: "post", type: "get", body: { id }}).then((post) => (
                dispatch(getPost(post)))
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagePost);
