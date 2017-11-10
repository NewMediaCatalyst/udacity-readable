// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {Comment} from '../utils/data';


class FormCommentEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: new Comment(),
            touched: {
                author: false,
                body: false,
                voteScore: false
            },
            receivedComment: false
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    static defaultProps = {
        comment: {}
    }

    componentDidMount() {
        const {comment} = this.props;
        let newComment = Object.assign({}, comment);
        if (comment.parentId !== "") {
            this.setState({ comment: newComment });
        }
    }

    componentWillUpdate(nextProps) {
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
        newComment[name] = value;
        this.setState({comment: newComment});
        this.forceUpdate();
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("handleSubmit: ", e);
    }

    validateForm() {
        let {author, body, voteScore} = this.state.comment;

        return {
            author: author === "",
            body: body === "",
            voteScore: isNaN(voteScore) || voteScore === ""
        }
    }

    isValidForm(errors) {
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
                                            type="text"
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
                                            name="body" value={body}
                                            id="comment-body"
                                            placeholder="Comment text"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button type="submit" disabled={this.isValidForm(errors)}>
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
        return (comment.parentId !== "") ? this.renderComment() : this.renderNoResults();
    }
}

function mapStateToProps(state) {
    return {
        comment: state.comment
    }
}

export default connect(mapStateToProps)(FormCommentEdit);
