// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// app
import FormCommentEdit from './FormCommentEdit';
import {getComment} from '../actions/comments';
import {apiFetch} from '../utils/api';


class PageCommentForm extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        match: {}
    }

    componentDidMount() {
        const {getComment, match} = this.props;
        if (match && match.params && match.params.id) {
            getComment(match.params.id);
        }
    }

    render() {
        return (
            <main className="app-content" role="main">
                <FormCommentEdit />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        comment: state.comment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getComment: (id) => apiFetch({action: "comment", type: "get", body: {id}})
            .then((comment) => dispatch(getComment(comment)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCommentForm);
