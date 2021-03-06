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
import {setMatch} from '../actions/meta';
import {whichPostAction} from '../utils/helpers';


class PagePost extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        let match, url = window.location.pathname;
        return {
            action: whichPostAction(match, url)
        };
    }

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        match: {}
    }

    componentDidMount() {
        const {match, setMatch} = this.props;

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
            <main className="app-content view-post-edit" role="main">
                <FormPostEdit />
            </main>
        );
    }

    renderCreate() {
        return (
            <main className="app-content view-post-create" role="main">
                <FormPostCreate />
            </main>
        );
    }

    renderPost() {
        return (
            <main className="app-content view-post" role="main">
                <Post /><CommentList /><FormCommentCreate />
            </main>
        );
    }

    renderLoading() {
        return (
            <main className="app-content" role="main"></main>
        );
    }


    render() {
        let {action} = this.state;
        switch (action) {
            case "edit": return this.renderEdit();
            case "read": return this.renderPost();
            case "create": return this.renderCreate();
            default: return this.renderLoading();
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
        setMatch: (match) => dispatch(setMatch(match))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagePost);
