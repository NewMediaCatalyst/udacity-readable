// libs
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import EditIcon from 'react-icons/lib/fa/edit';
import RemoveIcon from 'react-icons/lib/fa/close';

// app
import '../css/comp.commentlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';
import {getComments, deleteComment} from '../actions/comments';
import {apiFetch} from '../utils/api';


class CommentList extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired,
        comments: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: { all: {}, display: [] },
        comments: {}
    }

    handleDelete(ev) {
        ev.preventDefault();
        const {deleteComment} = this.props;
        deleteComment(ev.target.id);
    }

    componentDidMount() {
        const {getComments, posts} = this.props, {display} = posts;
        let postId = !_.isUndefined(display) ? display : "";

        if (postId !== "") {
            getComments(display[0]);
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {posts, getComments} = this.props;
        let postId = !_.isUndefined(posts.display[0]) ? posts.display[0] : "",
            nextPostId = !_.isUndefined(nextProps.posts.display[0]) ? nextProps.posts.display[0] : "";

        if ( (postId === "" && nextPostId !== "") || (postId !== nextPostId) ) {
            getComments(nextPostId);
        }
    }

    renderComments() {
        const {display, all} = this.props.comments;

        return (
            <Fragment>
                <h2 id="comment-listing" className="comment-listing-title">User Comments</h2>
                <ol className="comment-list">
                    {display.map((cId) => {
                        let {id, author, timestamp, voteScore, body} = all[cId];
                        return <li className="list-item" key={id}>
                            <Row className="comment-header">
                                <Col width={{sm:8, md:5}} className="comment-author">
                                    <strong>By: </strong>
                                    <span className="text">{author}</span>
                                </Col>
                                <Col width={{sm:8, md:4}} className="comment-date">
                                    <strong>posted: </strong>
                                    <DateTime date={timestamp} />
                                </Col>
                                <Col width={{sm:4, md:3}} className="comment-score">
                                    <VoteUpDown id={id} size="sm" type="comment" score={voteScore} />
                                </Col>
                            </Row>
                            <Row className="comment-content">
                                <Col width={{sm:12}} className="comment-body">{body}</Col>
                            </Row>
                            <Row className="comment-footer">
                                <Col width={{sm:12, md:6, lg:8}} className="comment-id">
                                    <strong>Comment ID: </strong>
                                    <span className="text">{id}</span>
                                </Col>
                                <Col width={{sm:12, md:6, lg:4}} className="comment-edit">
                                    <p><strong className="action-label">Comment actions: </strong>
                                        <Link
                                            to="#"
                                            id={id}
                                            className="comment-delete-link action-link"
                                            onClick={(ev) => this.handleDelete(ev)}
                                        >
                                            <RemoveIcon title="Delete comment" className="icon" />
                                            <span className="text">Delete</span>
                                        </Link>
                                        <Link
                                            to={`/comment/edit/${id}`}
                                            className="comment-edit-link action-link"
                                        >
                                            <EditIcon title="Edit comment" className="icon" />
                                            <span className="text">Edit</span>
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </li>
                    })
                }
                </ol>
            </Fragment>
        );
    }

    renderNoResults() {
        return (
            <Col width={{sm:12}} className="no-results">
                <p>Currently, no comments</p>
            </Col>
        );
    }

    render() {
        let {display} = this.props.comments;

        return (
            <Row className="comment-listing">
                <Col width={{sm:12}}>
                    {(display.length > 0)
                        ? this.renderComments()
                        : this.renderNoResults()
                    }
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (parentId) => apiFetch({action: "comment", type: "all", body: {parentId}})
            .then((comments) => dispatch(getComments(comments))),
        deleteComment: (id) => apiFetch({action: "comment", type: "delete", body: {id}})
            .then((comment) => dispatch(deleteComment(comment)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
