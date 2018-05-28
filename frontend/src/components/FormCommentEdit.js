// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';

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
        this.state = {
            comment: new Comment(),
            touched: {
                author: false,
                body: false,
                voteScore: false
            },
            showMessage: false,
            loaded_comment: false,
            loaded_parent: false,
            loaded_404: false
        };
    }

    static propTypes = {
        comments: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    static defaultProps = {
        comments: {},
        message: {
            success: ["Success!", "Comment was edited!"],
            error: ["Error!", "Editing comment failed!"]
        },
        url: "/comment/edit/"
    }

    getIdFromUrl() {
        const {url} = this.props,
            slashCount = url.match(/\//g).length;
        return window.location.pathname.split("/")[slashCount];
    }

    componentDidMount() {
        const {comments, posts} = this.props,
              {all: postsAll} = posts,
              {all: commentsAll} = comments;
        let parentPostId, commentId = this.getIdFromUrl();

        if (commentsAll[commentId] && commentsAll[commentId].parentId) {
            this.setState({
                comment: Object.assign({}, commentsAll[commentId]),
                loaded_comment: true
            });
            parentPostId = commentsAll[commentId].parentId;
        }
        if (parentPostId && postsAll && postsAll[parentPostId]) {
            this.setState({ loaded_parent: true });
        }
        if (!commentId || (!postsAll && !postsAll[parentPostId])) {
            this.setState({ loaded_404: true });
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {comments, posts} = nextProps,
              {all: postsAll} = posts,
              {all: commentsAll} = comments;

        let parentPostId,
            urlId = this.getIdFromUrl(),
            nextId = (!_.isUndefined(nextProps.comments.display)
                        && !_.isEmpty(nextProps.comments.display))
                        ? nextProps.comments.display[0] : urlId;

        if (commentsAll[nextId] && commentsAll[nextId].parentId) {
            this.setState({
                comment: Object.assign({}, commentsAll[nextId]),
                loaded_comment: true
            });
            parentPostId = commentsAll[nextId].parentId;
        }

        if (parentPostId && postsAll && postsAll[parentPostId]) {
            this.setState({ loaded_parent: true });
        }

        if (!nextId || (!postsAll && !postsAll[parentPostId])) {
            this.setState({ loaded_404: true });
        }

    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({ touched: updateTouch });
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

    handleCloseMessage() {
        this.setState({ showMessage: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const {updateComment} = this.props;
        let {comment} = this.state,
            {id} = comment;

        if (!this.isInvalidForm(this.validate())) {
            updateComment(comment, id);
            this.setState({ showMessage: true });
            this.closeTimer = setTimeout(() => this.handleCloseMessage(), 9000);
        }
    }

    validate() {
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

    renderLoading() {
        return (
            <div className="view-post-edit">
                <h1>Edit Comment</h1>
                <p>Loading comment details</p>
            </div>
        );
    }

    renderNoResults() {
        return (
            <div className="view-post-edit">
                <h1>Edit Comment</h1>
                <p>Missing ID or ID not found. Unable to edit!</p>
                <p><Link to="/">Back home &raquo;</Link></p>
            </div>
        );
    }

    renderComment() {
        let {comment, touched, showMessage} = this.state,
            {id, author, timestamp, body, voteScore, deleted, parentDeleted, parentId} = comment,
            errors = this.validate(),
            parentPostCat = "";

        const {success} = this.props.message,
              successHeading = success[0],
              successText = success[1],
            {posts} = this.props, {all} = posts;

        if (all && all[parentId] && all[parentId].category) {
            parentPostCat = all[parentId].category;
        }

        return (
            <div className="view-post-edit">
                <h1>Edit Comment</h1>
                {showMessage && <div className="callout message success">
                    <h3>{successHeading}</h3>
                    <p>
                        <span>{`${successText} `}</span>
                        <Link
                            className="message-link"
                            to={`/${parentPostCat}/${parentId}`}
                        >View updated comment &raquo;</Link>
                    </p>
                </div>}
                <form onSubmit={(ev) => this.handleSubmit(ev)}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="comment-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Comment ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Parent Post ID:</label>
                                        <span className="input-text text-uuid">{parentId}</span>
                                        <Link
                                            to={`/${parentPostCat}/${parentId}`}
                                            title={`View post (${parentId})`}
                                            className="input-text text-uuid"
                                        >View post &raquo;</Link>
                                        <input name="parentId" type="hidden" value={parentId} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-date">
                                        <label>Comment Date:</label>
                                        <DateTime date={timestamp} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-score">
                                        <label htmlFor="comment-score">Comment Score:</label>
                                        <input
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
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
                                            onChange={(ev) => this.handleChange(ev)}
                                            name="deleted"
                                            checked={deleted}
                                            id="comment-deleted"
                                            type="checkbox"
                                        />
                                        <label htmlFor="comment-deleted">Delete comment</label>
                                    </Col>
                                    <div>
                                        <input name="parentDeleted" type="hidden" value={parentDeleted} />
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
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
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
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
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
        let {loaded_comment, loaded_parent, loaded_404} = this.state;

        if (loaded_404) {
            return this.renderNoResults();
        } else if (loaded_comment && loaded_parent) {
            return this.renderComment();
        } else {
            return this.renderLoading();
        }
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (comment, id) => apiFetch({
            action: "comment", type: "edit", body: comment })
            .then((res) => dispatch(updateComment(comment)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCommentEdit);
