// libs
import React, { Component } from 'react';
import uuidV4 from 'uuid.v4';

// app
import '../css/app.css';
import Post from './Post';
import FormCommentCreate from './FormCommentCreate';

class PagePost extends Component {

    // TODO: replace use of uuid generation
    state = {
        postID: uuidV4()
    }

    render() {
        let {postID} = this.state;

        return (
            <main className="app-content" role="main">
                <Post postID={postID} />
                <FormCommentCreate postID={postID} />
            </main>
        );
    }
}

export default PagePost;
