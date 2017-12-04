// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

// app
import '../css/comp.commentlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';
import {getComments, deleteComment} from '../actions/comments';
import {apiFetch} from '../utils/api';


class CommentList extends Component {

    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        comments: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: { all: {}, display: [] },
        comments: {}
    }

    handleDelete(e) {
        e.preventDefault();
        const {deleteComment} = this.props;
        deleteComment(e.target.id);
    }

    componentDidMount() {
        const {getComments, posts} = this.props;
        let postId = !_.isUndefined(posts.display) ? posts.display : "";

        if (postId !== "") {
            getComments(posts.display[0]);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const {posts, getComments} = this.props;
        let postId = !_.isUndefined(posts.display[0]) ? posts.display[0] : "",
            nextPostId = !_.isUndefined(nextProps.posts.display[0]) ? nextProps.posts.display[0] : "";

        if (postId === "" && nextPostId !== "") {
            getComments(nextPostId);
        }
    }

    renderComments() {
        const {display, all} = this.props.comments;

        return <ol className="comment-list">
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
                            <p><strong>Actions: </strong>
                                <Link
                                    className="comment-delete-link action-link"
                                    onClick={this.handleDelete}
                                    id={id}
                                    to="#"
                                    >Delete comment &raquo;</Link>
                                <Link
                                    className="comment-edit-link action-link"
                                    to={`/comment/edit/${id}`}
                                    >Edit comment &raquo;</Link>
                            </p>
                        </Col>
                    </Row>
                </li>
            })
        }
        </ol>
    }

    renderNoResults() {
        return (
            <Col width={{sm:12}} className="no-results">
                <p>Currently, no comments</p>
            </Col>
        );
    }

    render() {
        let {comments} = this.props;

        return (
            <Row className="comment-listing">
                <Col width={{sm:12}}>
                    {(comments.display.length > 0) ? this.renderComments() : this.renderNoResults()}
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
