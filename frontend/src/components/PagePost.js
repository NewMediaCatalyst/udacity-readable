// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

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

    renderPost(action) {
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

    renderNoPost(action) {
        return (
            <main className="app-content" role="main"></main>
        );
    }

    render() {
        const {match, posts} = this.props, postID = posts.display[0];
        let action =  whichPostAction(match);
        return (!_.isUndefined(postID) && postID.length > 0)
            ? this.renderPost(action)
            : this.renderNoPost(action);
    }
}

function mapStateToProps(state, props) {
    return {
        posts: state.posts
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
