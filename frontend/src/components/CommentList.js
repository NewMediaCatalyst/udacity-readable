// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import '../css/comp.commentlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';
import {setSampleCommentData, Comment} from '../utils/data.js';


class CommentList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: setSampleCommentData(),
            comments: [new Comment()]
        }
    }

    static propTypes = {
        postID: PropTypes.string.isRequired
    }

    static defaultProps = {
        postID: ""
    }

    componentDidMount() {
        const {postID} = this.props;
        let newComments = [],
            {data} = this.state;

        for (let i = 0; i < data.length; i++) {
            if (data[i].parentID === postID) {
                newComments.push(data[i]);
            }
        }
        // console.log("newComments: ", newComments);
        /*
        newComments = data.comments.filter((comment) => {
            return (comment.parentID === postID && !comment.parentDeleted && !comment.deleted);
        });
        */

        this.setState({ comments: newComments });
    }

    renderComments() {
        let {comments} = this.state;

        return <ol className="comment-list">
            {comments.map((comment) => (
                <li className="list-item" key={comment.id}>
                    <Row className="comment-header">
                        <Col width={{sm:8, md:5}} className="comment-author">
                            <strong>By: </strong>
                            <span className="text">{comment.author}</span>
                        </Col>
                        <Col width={{sm:8, md:4}} className="comment-date">
                            <strong>posted: </strong>
                            <DateTime date={comment.timestamp} />
                        </Col>
                        <Col width={{sm:4, md:3}} className="comment-score">
                            <VoteUpDown size="sm" type="Comment" score={comment.voteScore} />
                        </Col>
                    </Row>
                    <Row className="comment-content">
                        <Col width={{sm:12}} className="comment-body">{comment.body}</Col>
                    </Row>
                    <Row className="comment-footer">
                        <Col width={{sm:9, md:7}} className="comment-id">
                            <strong>Comment ID: </strong>
                            <span className="text">{comment.id}</span>
                        </Col>
                        <Col width={{sm:3, md:5}} className="comment-edit">
                            <p><Link to={`/comment/edit/${comment.id}`}>Edit comment &raquo;</Link></p>
                        </Col>
                    </Row>
                </li>
            ))}
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
        let {comments} = this.state;

        return (
            <Row className="comment-listing">
                <Col width={{sm:12}}>
                    {(comments !== undefined && comments.length > 0) ?
                        this.renderComments() : this.renderNoResults() }
                </Col>
            </Row>
        );
    }
}

export default CommentList;
