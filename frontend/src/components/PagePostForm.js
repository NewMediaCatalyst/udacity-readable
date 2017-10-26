// libs
import React, { Component } from 'react';
import uuidV4 from 'uuid.v4';

// app
import '../css/app.css';
import FormPostCreate from './FormPostCreate';
import FormPostEdit from './FormPostEdit';

class PagePostForm extends Component {

    state = {
        edit: false,
        postID: uuidV4()
    }

    render() {
        let {edit, postID} = this.state;

        return (
            <main className="app-content" role="main">
                {edit ?
                    <FormPostEdit postID={postID} />
                    : <FormPostCreate />
                }
            </main>
        );
    }
}

export default PagePostForm;
