// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {setSamplePostData, Post} from '../utils/data.js';


class FormPostEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: setSamplePostData(),
            post: new Post()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        postID: PropTypes.string.isRequired
    }

    static defaultProps = {
        postID: null
    }

    componentDidMount() {
        const {postID} = this.props;
        let {postData} = this.state,
            post = (postData !== undefined && postData.length > 0) ?
                postData.filter((post) => post.id === postID) : false;
        this.setState({ post: post[0] });
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("handleSubmit: ", e);
    }

    handleChange(e) {
        const target = e.target,
              type = e.target.type,
              name = e.target.name;
        let newPost = Object.assign({}, this.state.post);
        newPost[name] = type === 'checkbox' ? target.checked : target.value;

        this.setState({ post: newPost });
    }

    renderNoResults() {
        return <div className="no-results">Missing ID. Unable to edit</div>
    }

    renderPost() {
        let {post} = this.state,
            {id, title, author, timestamp, category, body, voteScore, deleted} = post;

        return (
            <div className="view-post-edit">
                <h1>Edit Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="post-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={timestamp} />
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
                                        <input onChange={this.handleChange} name="author" value={author} id="post-author" type="text" placeholder="Post Author" />
                                    </Col>
                                    <Col width={{sm:12,md:6,lg:4}} className="post-title">
                                        <label htmlFor="post-cat">Category</label>
                                        <select onChange={this.handleChange} name="category" value={category} id="post-cat">
                                            <option value="">Select</option>
                                            <option value="btc">Bitcoin</option>
                                            <option value="eth">Ethereum</option>
                                            <option value="ltc">Litecoin</option>
                                            <option value="xrp">Ripple</option>
                                        </select>
                                    </Col>
                                    <Col width={{sm:12,md:12,lg:12}} className="post-title">
                                        <label htmlFor="post-title">Title</label>
                                        <input onChange={this.handleChange} name="title" value={title} id="post-title" type="text" placeholder="Article title" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-body">
                                        <label htmlFor="post-body">Body</label>
                                        <textarea onChange={this.handleChange} name="body" value={body} id="post-body" />
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

    render() {
        let {post} = this.state;

        return post ? this.renderPost() : this.renderNoResults();
    }
}

export default FormPostEdit;
