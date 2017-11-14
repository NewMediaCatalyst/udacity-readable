// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';


class Post extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    static defaultProps = {
        post: {}
    }

    render() {
        const {post} = this.props;
        if (post.details === undefined) { return null; }
        const {id, title, author, timestamp, category, body, voteScore} = post.details;
        console.log("Post :: render : voteScore: ", voteScore);

        return (
            <article className="view-post">
                <Row className="post-header">
                    <Col width={{sm:12}} className="post-title-col">
                        <h1 className="post-title">{title}</h1>
                    </Col>
                    <Col width={{sm:9, md:12, lg:4}} className="post-author">
                        <p>
                            <strong>By: </strong>
                            <span className="text text-author">{author}</span>
                        </p>
                    </Col>
                    <Col width={{sm:8, md:6, lg:4}} className="post-date">
                        <p>
                            <strong>Published: </strong>
                            <DateTime date={timestamp} />
                        </p>
                    </Col>
                    <Col width={{sm:5, md:12, lg:4}} className="post-score">
                        <VoteUpDown id={id} score={voteScore} />
                    </Col>
                </Row>
                <Row margin={true} className="post-body">
                    <Col width={{sm:12, lg:12}} className="post-body">{body}</Col>
                </Row>
                <Row className="post-footer">
                    <Col width={{sm:12, md:6, lg:5}} className="post-id">
                        <p>
                            <strong>Post ID: </strong>
                            <span className="text text-uuid">{id}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:3}} className="post-category">
                        <p>
                            <strong>Category: </strong>
                            <span className="text">{category}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:4}} className="post-edit">
                        <p><Link to={`/post/edit/${id}`}>Edit post &raquo;</Link></p>
                    </Col>
                </Row>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post
    };
}

export default connect(mapStateToProps)(Post);
