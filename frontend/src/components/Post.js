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
import {setPageTitle} from '../actions/meta';
import {getPost, deletePost} from '../actions/posts';


class Post extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {},
        meta: {},
        title: { page: "" },
        postURL: "/post/"
    }

    componentDidMount() {
        const {getPost} = this.props, {match} = this.props.meta, {id} = match;
        if (id) { getPost(id); }
    }

    componentWillReceiveProps(nextProps) {
        const {setPageTitle, getPost, meta: curMeta} = this.props,
            {page: curTitle} = curMeta.title,
            {meta: nextMeta, posts} = nextProps,
            {id} = nextMeta.match,
            {all} = posts,
            nextTitle = all[id].title;
        let postExists = (id && posts && all && typeof all[id] !== 'undefined');

        if (id && !postExists) { getPost(id); }
        if (id && postExists && curTitle !== nextTitle) {
            setPageTitle({page: nextTitle});
        }
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
                            <Link onClick={(ev) => this.handleDelete(ev)} className="post-link-delete action-link" to="/posts/">Delete post &raquo;</Link>
                            <Link className="post-link-edit action-link" to={`/post/edit/${postId}`}>Edit post &raquo;</Link>
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
        const {postURL} = this.props,
            {all} = this.props.posts,
            {match} = this.props.meta, {id} = match;
        let urlId = window.location.pathname.substr(postURL.length-1);

        if (!id || _.isEmpty(all)) {
            return this.renderEmpty()
        } else if ((id === undefined && urlId.length > 0) || id !== urlId) {
            return this.renderPost(urlId, all);
        } else {
            return this.renderPost(id, all);
        }

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
        },
        setPageTitle: (title) => (dispatch(setPageTitle(title)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
