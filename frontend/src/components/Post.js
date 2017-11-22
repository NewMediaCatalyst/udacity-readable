// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import _ from 'lodash';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';


class Post extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {}
    }

    render() {
        const {all, display} = this.props.posts;
        if (_.isUndefined(display[0]) || _.isUndefined(all)) { return null; }
        console.log("display: ", display, "; all: ", all);
        const {id, title, author, timestamp, category, body, voteScore, commentCount} = all[display[0]];

        return (
            <article className="view-post">
                <Row className="post-header">
                    <Col width={{sm:12}} className="post-title-col">
                        <h1 className="post-title">
                            <span className="text">{title}</span>
                        </h1>
                        {commentCount > 0 &&
                            <p className="post-title-comments">
                                {`${commentCount} comments`}
                            </p>
                        }
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
        posts: state.posts
    };
}

export default connect(mapStateToProps)(Post);
