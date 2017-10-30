// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import FormCommentEdit from './FormCommentEdit';


class PageCommentForm extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    static defaultProps = {
        pgTitle: 'Create Edit Post',
        match: null
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle} = this.props;
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        let {match} = this.props,
            commentID = (match.params.id !== undefined && match.params.id.length > 0) ?
                match.params.id : null;

        return (
            <main className="app-content" role="main">
                <FormCommentEdit commentID={commentID} />
            </main>
        );
    }
}

export default PageCommentForm;
