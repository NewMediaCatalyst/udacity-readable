// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import FormPostCreate from './FormPostCreate';
import FormPostEdit from './FormPostEdit';


class PagePostForm extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    static defaultProps = {
        pgTitle: 'Create Edit Post',
        match: null
    }

    componentDidMount() {
        const {pgTitle, appSep, appTitle} = this.props;
        console.log(`componentDidMount (PageCreateEditForm): ${pgTitle} :: ${appSep} :: ${appTitle}`);
        document.title = pgTitle ? pgTitle + appSep + appTitle : appTitle
    }

    render() {
        let {match} = this.props,
            postID = (match.params.id !== undefined && match.params.id.length > 0) ?
                match.params.id : null;
        console.log("PagePostForm :: postID: " + postID);

        return (
            <main className="app-content" role="main">
                {postID ?
                    <FormPostEdit postID={postID} />
                    : <FormPostCreate />
                }
            </main>
        );
    }
}

export default PagePostForm;
