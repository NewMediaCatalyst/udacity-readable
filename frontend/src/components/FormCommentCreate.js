// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {Comment} from '../utils/data';
import {apiFetch} from '../utils/api';
import {createComment} from '../actions/comments';


class FormCommentCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: new Comment(),
            touched: {
                author: false,
                body: false
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    handleSubmit(e) {
        e.preventDefault();
        const {createComment} = this.props;
        let {comment} = this.state;
        console.log("form submitted: ", e.target);
        createComment(comment);
    }

    handleChange(e) {
        const target = e.target, name = target.name, type = target.type;
        let newComment = Object.assign({}, this.state.comment);
        newComment[name] = type === "checkbox" ? target.checked : target.value;
        this.setState({ comment: newComment });
    }

    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({ touched: updateTouch });
    }

    validate() {
        let {author, body} = this.state.comment;
        return {
            author: author === "",
            body: body === ""
        }
    }

    isValidForm(errors) {
        if (errors === undefined) { return true; }
        return Object.keys(errors).some(error => errors[error]);
    }

    render() {
        const {post} = this.props,
              errors = this.validate();
        let {comment, touched} = this.state,
            {id, timestamp, body, author, voteScore, deleted, parentDeleted} = comment;

        return (
            <div id="comment-create" className="view-comment-create">
                <h3>Want to comment?</h3>
                <form onSubmit={this.handleSubmit}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="comment-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Comment ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                        <input name="id" type="hidden" value={id} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{post.id}</span>
                                        <input name="parentId" type="hidden" value={post.id} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-date">
                                        <label>Comment Date:</label>
                                        <DateTime date={timestamp} />
                                        <input name="timestamp" type="hidden" value={timestamp} />
                                    </Col>
                                    <div>
                                        <input name="voteScore" type="hidden" value={voteScore} />
                                        <input name="deleted" type="hidden" value={deleted} />
                                        <input name="parentDeleted" type="hidden" value={parentDeleted} />
                                    </div>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="comment-main">
                            <fieldset>
                                <Row margin={true}>
                                    <Col width={{sm:12, lg:12}} className="comment-author">
                                        <label htmlFor="comment-author">Author:</label>
                                        <input
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            id="comment-author"
                                            name="author"
                                            type="text"
                                            value={author}
                                            placeholder="Author name"
                                            className={(touched.author && errors.author) ? 'is-invalid-input' : null}
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-body">
                                        <label htmlFor="comment-body">Body:</label>
                                        <textarea
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            id="comment-body"
                                            name="body"
                                            value={body}
                                            placeholder="Comment body"
                                            className={(touched.body && errors.body) ? 'is-invalid-input' : null}
                                        />
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="form-actions">
                            <button type="submit" disabled={this.isValidForm(errors)}>
                                <span className="text">Submit</span>
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: (comment) => {
            return apiFetch({action: "comment", type: "add", body: comment}).then((res) => dispatch(createComment(comment)))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCommentCreate);
