// libs
import React, { Component } from 'react';

// app
import '../css/app.css';
import Post from './Post';
import FormCommentCreate from './FormCommentCreate';

class PagePost extends Component {

    render() {
        return (
            <main className="app-content" role="main">
                <Post />
                <FormCommentCreate />
            </main>
        );
    }
}

export default PagePost;
