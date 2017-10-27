// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {setSamplePostData} from '../utils/data.js';


class PostList extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    static defaultProps = {
        category: "all"
    }

    state = {
        postData: setSamplePostData()
    }

    renderPosts() {
        let {postData} = this.state;
        return <ol>
            {postData.map((post) => (
                <li key={post.id}>
                    <h2 className="post-title">{post.title}</h2>
                    <p>
                        <span className="post-author">{post.author}</span>
                        <DateTime date={post.timestamp} />
                        <span className="post-category">{post.category}</span>
                    </p>
                </li>
             ))}
        </ol>
    }

    renderNoResults() {
        return (
            <Col width={{sm:12}} className="no-results">
                <p>Currently, no posts</p>
            </Col>
        );
    }

    render() {
        let {postData} = this.state;

        return (
            <Row className="post-listing">
                {(postData !== undefined && postData.length > 0) ? this.renderPosts() : this.renderNoResults() }
            </Row>
        );
    }
}

export default PostList;
