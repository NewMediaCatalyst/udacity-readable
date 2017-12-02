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
import {setMatch} from '../actions/meta';
import {apiFetch} from '../utils/api';
import {whichPostAction} from '../utils/helpers';


class PagePost extends Component {

    constructor(props) {
        super(props);
        this.state = { action: "create" };
    }

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        pgTitle: 'Post',
        match: {}
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle, match, setMatch} = this.props;
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle;

        if (match && typeof match.params.id !== 'undefined') {
            setMatch(match);
            this.setState({ action: whichPostAction(match) });
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        let {action} = this.state,
            newAction = whichPostAction(nextProps.match);

        if (newAction !== action) {
            this.setState({ action: newAction });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {action} = this.state,
            newAction = whichPostAction(nextProps.match);
        return newAction !== action;
    }

    renderEdit() {
        return (
            <main className="app-content" role="main">
                <FormPostEdit />
            </main>
        );
    }

    renderCreate() {
        return (
            <main className="app-content" role="main">
                <FormPostCreate />
            </main>
        );
    }

    renderPost() {
        return (
            <main className="app-content" role="main">
                <Post /><CommentList /><FormCommentCreate />
            </main>
        );
    }


    render() {
        let {action} =  this.state;

        switch (action) {
            case "edit": return this.renderEdit();
            case "read": return this.renderPost();
            default: return this.renderCreate();
        }

    }

}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        meta: state.meta
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => {
            return apiFetch({action: "post", type: "get", body: { id }}).then((post) => (
                dispatch(getPost(post)))
            );
        },
        setMatch: (match) => dispatch(setMatch(match))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagePost);
