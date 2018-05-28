// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames'
import _ from 'lodash';
import EditIcon from 'react-icons/lib/fa/edit';
import RemoveIcon from 'react-icons/lib/fa/close';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';
import {apiFetch} from '../utils/api';
import {setPageTitle} from '../actions/meta';
import {setPost, deletePost} from '../actions/posts';


class Post extends Component {


    constructor(props) {
        super(props);
        this.state = {
            post_404: false,
            post_attempts: 0
        }
    }

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
            {id: nextId} = nextMeta.match,
            {all} = posts;
        let nextTitle, postExists, {post_attempts} = this.state;

        // check for missing or deleted posts
        postExists = (nextId && posts && all && typeof all[nextId] !== 'undefined');
        // post is available in redux
        if (postExists) {
            if (all[nextId].title) { nextTitle = all[nextId].title; }
            if (nextTitle && curTitle !== nextTitle) { setPageTitle({page: nextTitle}); }
        // hasn't tried to load previously, and nextId exists
        } else if (post_attempts < 1 && nextId) {
            getPost(nextId);
            this.setState({post_attempts: post_attempts + 1});
        // stop trying, and declare 404
        } else {
            this.setState({post_404: true});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {meta: curMeta} = this.props, {id: curId} = curMeta,
            {meta: nextMeta} = nextProps, {id: nextId} = nextMeta;
        return (!nextId || nextId !== curId);
    }

    updateUrlPostDel() {
        window.location.href = "/";
    }

    handleDelete(ev) {
        ev.preventDefault();
        const {deletePost, meta} = this.props, {id} = meta.match;
        deletePost(id);
        this.timer = setTimeout(this.updateUrlPostDel, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    renderPost(id, all) {
        const {id: postId, title, author, timestamp, category, body, voteScore, commentCount} = all[id];

        return (
            <article>
                <Row className="post-header">
                    <Col width={{sm:12}} className="post-title-col">
                        <h1 className="post-title">
                            <span className="text">{title}</span>
                        </h1>
                        <p className="post-title-comments">
                            {commentCount > 0 &&
                                <a
                                    href="#comment-listing"
                                    title={`View ${commentCount} comments`}
                                >{`${commentCount} comments`}</a>
                            }
                            <a href="#comment-create">Want to comment?</a>
                            <a
                                href="#post-edit-links"
                                title="Click to edit or delete this post?"
                            >Edit or delete article?</a>
                        </p>
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
                    <Col width={{sm:12, lg:12}}>{body}</Col>
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
                            <span className="text">{category.toUpperCase()}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:4}} className="post-edit">
                        <p id="post-edit-links" className="post-edit-links">
                            <strong className="action-label">Post actions: </strong>
                            <Link
                                onClick={(ev) => this.handleDelete(ev)}
                                className="post-link-delete action-link"
                                to="/posts/"
                            >
                                <RemoveIcon className="icon" />
                                <span  title="Delete this post" className="text">Delete</span>
                            </Link>
                            <Link
                                className="post-link-edit action-link"
                                to={`/post/edit/${postId}`}
                            >
                                <EditIcon className="icon" />
                                <span title="Edit this post" className="text">Edit</span>
                            </Link>
                        </p>
                    </Col>
                </Row>
            </article>
        );
    }

    renderLoading() {
        return (
            <article>
                <div className="post-body loading">
                    <h1 className="post-title">
                        <span className="text">Loading Post</span>
                    </h1>
                    <p>Please wait...</p>
                </div>
            </article>
        );
    }

    renderEmpty() {
        let {post_404} = this.state,
            articleClasses = classnames({ "post-404": post_404});
        return (
            <article className={articleClasses}>
                <div className="post-body">
                    <h1 className="post-title">
                        <span className="text">404 Error</span>
                    </h1>
                    <p>No post exists. <Link to="/">Home &raquo;</Link></p>
                </div>
            </article>
        );
    }

    render() {
        const {postURL} = this.props,
            {all} = this.props.posts,
            {match} = this.props.meta, {id} = match;
        let urlId = window.location.pathname.substr(postURL.length-1),
            {post_404} = this.state;

        if (!post_404 && id && _.isEmpty(all)) {
            console.log("Post :: render() :: Loading route :: post_404: ", post_404, "; id: ", id, "; _.isEmpty(all): ", _.isEmpty(all) );
            return this.renderLoading();
        } else if (post_404 || !id || _.isEmpty(all)) {
            console.log("Post :: render() :: 404 route :: post_404: ", post_404, "; id: ", id, "; _.isEmpty(all): ", _.isEmpty(all) );
            return this.renderEmpty();
        } else if ((id === undefined && urlId.length > 0) || id !== urlId) {
            console.log("Post :: render() :: PATH1 :: id === undefined: ", id === undefined, "; urlId.length > 0: ", urlId.length > 0, "; id !== urlId: ", id !== urlId);
            return this.renderPost(urlId, all);
        } else {
            console.log("Post :: render() :: PATH2:ELSE ::  ");
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
            console.log("Post :: mapDispatchToProps :: id: ", id);
            return apiFetch({action: "post", type: "get", body: { id }})
                .then((post) => dispatch(setPost(post)))
        },
        deletePost: (id) => {
            return apiFetch({action: "post", type: "delete", body: { id }})
                .then((post) => dispatch(deletePost(post)))
        },
        setPageTitle: (title) => (dispatch(setPageTitle(title)))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
