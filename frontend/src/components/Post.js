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
import {apiFetch} from '../utils/api';
import {getPost, deletePost} from '../actions/posts';


class Post extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {},
        meta: {}
    }

    componentDidMount() {
        const {getPost} = this.props, {match} = this.props.meta, {id} = match;
        if (id) { getPost(id); }
    }

    componentWillReceiveProps(nextProps) {
        const {meta, posts, getPost} = nextProps, {id} = meta.match;
        let postExists = (id && posts && posts.all && typeof posts.all[id] !== 'undefined');
        if (id && !postExists) { getPost(id); }
    }

    handleDelete(e) {
        e.preventDefault();
        const {deletePost, meta} = this.props, {id} = meta.match;
        deletePost(id);
        window.location.href = e.target.getAttribute("href");
    }

    renderPost(id, all) {
        const {id: postId, title, author, timestamp, category, body, voteScore, commentCount} = all[id];

        return (
            <article className="view-post">
                <Row className="post-header">
                    <Col width={{sm:12}} className="post-title-col">
                        <h1 className="post-title">
                            <span className="text">{title}</span>
                        </h1>
                        {commentCount > 0 &&
                            <p className="post-title-comments">{`${commentCount} comments`}</p>
                        }
                    </Col>
                    <Col width={{sm:12, md:12, lg:8}} className="post-author">
                        <p>
                            <span className="post-author-text">
                                <strong>By: </strong>
                                <span className="text text-author">{author}</span>
                            </span>
                            <span className="post-pubdate-text">
                                <strong>Published: </strong>
                                <DateTime date={timestamp} />
                            </span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:12, lg:4}} className="post-score">
                        <VoteUpDown align="" id={postId} score={voteScore} />
                    </Col>
                </Row>
                <Row margin={true} className="post-body">
                    <Col width={{sm:12, lg:12}} className="post-body">{body}</Col>
                </Row>
                <Row className="post-footer">
                    <Col width={{sm:12, md:6, lg:5}} className="post-id">
                        <p>
                            <strong>Post ID: </strong>
                            <span className="text text-uuid">{postId}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:3}} className="post-category">
                        <p>
                            <strong>Category: </strong>
                            <span className="text">{category}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:4}} className="post-edit">
                        <p>
                            <strong>Actions: </strong>
                            <Link onClick={this.handleDelete} className="post-link-delete" to="/posts/">Delete post &raquo;</Link>
                            <Link className="post-link-edit" to={`/post/edit/${postId}`}>Edit post &raquo;</Link>
                        </p>
                    </Col>
                </Row>
            </article>
        );
    }

    renderEmpty() {
        return (
            <article className="view-post">
                <h1 className="post-title">
                    <span className="text">No post</span>
                </h1>
            </article>
        );
    }

    render() {
        const {all} = this.props.posts, {match} = this.props.meta, {id} = match;
        return (!id || _.isEmpty(all)) ? this.renderEmpty() : this.renderPost(id, all);
    }
}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        meta: state.meta
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => {
            return apiFetch({action: "post", type: "get", body: { id }})
                .then((post) => dispatch(getPost(post)))
        },
        deletePost: (id) => {
            return apiFetch({action: "post", type: "delete", body: { id }})
                .then((post) => dispatch(deletePost(post)))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
