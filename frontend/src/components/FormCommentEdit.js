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
import {updateComment} from '../actions/comments';


class FormCommentEdit extends Component {

    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        comment: new Comment(),
        touched: {
            author: false,
            body: false,
            voteScore: false
        },
        receivedComment: false
    }

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    static defaultProps = {
        comment: {}
    }

    componentDidMount() {
        let {comment} = this.state;

        if (this.props.comment.parentId !== undefined) {
            let newComment = Object.assign({}, comment);
            this.setState({ comment: newComment });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let {receivedComment} = this.state, newComment;

        if (!receivedComment && nextProps.comment.parentId !== undefined && nextProps.comment.parentId.length > 0) {
            newComment = Object.assign({}, nextProps.comment);
            this.setState({ receivedComment: true, comment: newComment });
        }
    }

    shouldComponentUpdate(nextProps) {
        return !this.state.receivedComment;
    }

    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({touched: updateTouch});
        this.forceUpdate();
    }

    handleChange(e) {
        const target = e.target,
              type = target.type,
              name = target.name,
              value = type === "checkbox" ? target.checked : target.value;
        let newComment = Object.assign({}, this.state.comment);
        newComment[name] = type === "number" ? Number(value) : value;
        this.setState({comment: newComment});
        this.forceUpdate();
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const {updateComment} = this.props;
        let {comment} = this.state,
            {id} = comment;

        console.log("isValidForm: ", (!this.isInvalidForm(this.validateForm())));
        console.log("comment: ", comment);
        if (!this.isInvalidForm(this.validateForm())) {
            updateComment(comment, id);
        }
    }

    validateForm() {
        let {author, body, voteScore} = this.state.comment;

        return {
            author: author === "",
            body: body === "",
            voteScore: isNaN(voteScore) || voteScore === ""
        }
    }

    isInvalidForm(errors) {
        return Object.keys(errors).some(error => errors[error])
    }

    renderNoResults() {
        return <div className="no-results">Missing ID. Unable to edit</div>
    }

    renderComment() {
        let {comment, touched} = this.state,
            {id, author, timestamp, body, voteScore, deleted, parentDeleted, parentId} = comment;
        let errors = this.validateForm();

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
                                        <input
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            className={(touched.voteScore && errors.voteScore) ? 'is-invalid-input' : null}
                                            name="voteScore"
                                            value={voteScore}
                                            id="comment-score"
                                            type="number"
                                            step="1"
                                            min="1"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-deleted">
                                        <label htmlFor="comment-deleted">Comment Active:</label>
                                        <input
                                            onChange={this.handleChange}
                                            name="deleted"
                                            checked={deleted}
                                            id="comment-deleted"
                                            type="checkbox"
                                        />
                                        <label htmlFor="comment-deleted">Delete comment</label>
                                    </Col>
                                    <div>
                                        <input name="deleted" type="hidden" value={deleted} />
                                        <input name="parentDeleted" type="hidden" value={parentDeleted} />
                                        <input name="parentId" type="hidden" value={parentId} />
                                    </div>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="comment-main">
                            <fieldset>
                                <legend>Comment:</legend>
                                <Row margin={true}>
                                    <Col width={{sm:12,md:6,lg:8}} className="comment-author">
                                        <label htmlFor="comment-author">Author Name</label>
                                        <input
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            className={(touched.author && errors.author) ? 'is-invalid-input' : null}
                                            name="author"
                                            value={author}
                                            id="comment-author"
                                            type="text"
                                            placeholder="Comment Author"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-body">
                                        <label htmlFor="comment-body">Body</label>
                                        <textarea
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            className={(touched.body && errors.body) ? 'is-invalid-input' : null}
                                            name="body"
                                            value={body}
                                            id="comment-body"
                                            placeholder="Comment text"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button type="submit" disabled={this.isInvalidForm(errors)}>
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
        let {comment} = this.state, {parentId} = comment;
        return (parentId !== "") ? this.renderComment() : this.renderNoResults();
    }
}

function mapStateToProps(state) {
    return {
        comment: state.comment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (comment, id) => {
                console.log()
                return apiFetch({ action: "comment", type: "edit", body: comment })
                    .then((res) => dispatch(updateComment(comment)))
            }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCommentEdit);
