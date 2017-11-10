// libs
import React, { Component } from 'react';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';

import {Post} from '../utils/data.js';


class FormPostCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: new Post()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target,
              type = e.target.type,
              value = type === 'checkbox' ? target.checked : target.value,
              name = e.target.name;
        let newPost = Object.assign({}, this.state.post);
        newPost[name] = value;

        this.setState({ post: newPost });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("clicked button: ", e);
    }

    render() {
        let {post} = this.state,
            {id, title, author, timestamp, category, body, voteScore, deleted} = post;

        return (
            <div className="view-post-create">
                <h1>Create New Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="post-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                        <input id="post-uuid" name="id" type="hidden" value={id} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={timestamp} />
                                        <input id="post-date" name="timestamp" type="hidden" value={timestamp} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label htmlFor="post-score">Post Score:</label>
                                        <input onChange={this.handleChange} name="voteScore" value={voteScore} id="post-score" type="text" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label>Post Active:</label>
                                        <input onChange={this.handleChange} name="deleted" checked={deleted} id="post-deleted" type="checkbox" />
                                        <label htmlFor="post-deleted">Delete post</label>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="post-main">
                            <fieldset>
                                <legend>Post:</legend>
                                <Row margin={true}>
                                    <Col width={{sm:12,md:6,lg:8}} className="post-author">
                                        <label htmlFor="post-author">Author Name</label>
                                        <input value={author} id="post-author" name="author" type="text" placeholder="Post Author" />
                                    </Col>
                                    <Col width={{sm:12,md:6,lg:4}} className="post-title">
                                        <label htmlFor="post-cat">Category</label>
                                        <select value={category} id="post-cat" name="category">
                                            <option value="">Select Category</option>
                                            <option value="btc">Bitcoin</option>
                                            <option value="eth">Ethereum</option>
                                            <option value="ltc">Litecoin</option>
                                            <option value="xrp">Ripple</option>
                                        </select>
                                    </Col>
                                    <Col width={{sm:12,md:12,lg:12}} className="post-title">
                                        <label htmlFor="post-title">Title</label>
                                        <input value={title} id="post-title" name="title" type="text" placeholder="Post title" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-body">
                                        <label htmlFor="post-body">Body</label>
                                        <textarea value={body} id="post-body" name="body" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button type="submit">
                                            <span className="text">Submit</span>
                                        </button>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

export default FormPostCreate;
