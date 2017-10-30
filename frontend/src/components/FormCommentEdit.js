// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {setSampleCommentData, Comment} from '../utils/data.js';


class FormCommentEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentData: setSampleCommentData(),
            comment: new Comment()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        commentID: PropTypes.string.isRequired
    }

    static defaultProps = {
        commentID: null
    }

    componentDidMount() {
        const {commentID} = this.props;
        let {commentData} = this.state,
            comment = (commentData !== undefined && commentData.length > 0) ?
                commentData.filter((comment) => comment.id === commentID) : false;
        this.setState({ comment: comment[0] });
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
        let newComment = Object.assign({}, this.state.comment);
        newComment[name] = type === 'checkbox' ? target.checked : target.value;

        this.setState({ comment: newComment });
    }

    renderNoResults() {
        return <div className="no-results">Missing ID. Unable to edit</div>
    }

    renderComment() {
        let {comment} = this.state,
            {id, author, timestamp, body, voteScore, deleted} = comment;

        return (
            <div className="view-post-edit">
                <h1>Edit Comment</h1>
                <form onSubmit={this.handleSubmit}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="comment-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Comment ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-date">
                                        <label>Comment Date:</label>
                                        <DateTime date={timestamp} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-score">
                                        <label htmlFor="comment-score">Comment Score:</label>
                                        <input onChange={this.handleChange} name="voteScore" value={voteScore} id="comment-score" type="text" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-deleted">
                                        <label>Comment Active:</label>
                                        <input onChange={this.handleChange} name="deleted" checked={deleted} id="comment-deleted" type="checkbox" />
                                        <label htmlFor="comment-deleted">Delete comment</label>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="comment-main">
                            <fieldset>
                                <legend>Comment:</legend>
                                <Row margin={true}>
                                    <Col width={{sm:12,md:6,lg:8}} className="comment-author">
                                        <label htmlFor="comment-author">Author Name</label>
                                        <input onChange={this.handleChange} name="author" value={author} id="comment-author" type="text" placeholder="Post Author" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-body">
                                        <label htmlFor="comment-body">Body</label>
                                        <textarea onChange={this.handleChange} name="body" value={body} id="comment-body" />
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
        let {comment} = this.state;
        return comment ? this.renderComment() : this.renderNoResults();
    }
}

export default FormCommentEdit;
