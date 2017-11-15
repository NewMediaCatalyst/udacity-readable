// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// app
import '../css/comp.commentlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';
import {getComments} from '../actions/comments';
import {apiFetch} from '../utils/api';


class CommentList extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        comments: PropTypes.object.isRequired
    }

    static defaultProps = {
        post: { id: ""},
        comments: {}
    }

    componentDidMount() {
        const {getComments, post} = this.props;
        if (post.id !== "") { getComments(post.id); }
    }

    componentWillUpdate(nextProps, nextState) {
        const {post, getComments} = this.props;

        if (post.id === "" && nextProps.post.id !== "") {
            getComments(nextProps.post.id);
        }
    }

    renderComments() {
        let {comments} = this.props;

        console.log("00 renderComments :: comments: ", comments);
        return <ol className="comment-list">
            {Object.values(comments.all).map((comment) => {
            console.log("01 renderComments :: comment: ", comment);
            let {id, author, timestamp, voteScore, body} = comment;
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
                        <Col width={{sm:9, md:7}} className="comment-id">
                            <strong>Comment ID: </strong>
                            <span className="text">{id}</span>
                        </Col>
                        <Col width={{sm:3, md:5}} className="comment-edit">
                            <p><Link to={`/comment/edit/${id}`}>Edit comment &raquo;</Link></p>
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
                    {(comments.all) ? this.renderComments() : this.renderNoResults()}
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (parentId) => apiFetch({action: "comment", type: "all", body: {parentId}})
            .then((comments) => { console.log("CommentList :: comments: ", comments); dispatch(getComments(comments)) })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
