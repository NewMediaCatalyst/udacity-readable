// libs
import React, { Component } from 'react';

// app
import '../css/app.css';
// import FormPostCreate from './FormPostCreate';
import FormCommentCreate from './FormCommentCreate';

class PageHome extends Component {

    render() {
        return (
            <main className="app-content" role="main">
                <FormCommentCreate />
            </main>
        );
    }
}

export default PageHome;
