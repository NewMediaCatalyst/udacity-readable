// libs
import React, { Component } from 'react';

// app
import '../css/app.css';
import FormPostCreate from './FormPostCreate';

class PagePostForm extends Component {

    render() {
        return (
            <main className="app-content" role="main">
                <FormPostCreate />
            </main>
        );
    }
}

export default PagePostForm;
