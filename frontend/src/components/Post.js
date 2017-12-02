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
import {getPost} from '../actions/posts';


class Post extends Component {

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

/*
    componentWillReceiveProps(nextProps) {
        const {meta: curMeta} = this.props.meta, {id: curId} = curMeta.match,
              {meta, posts, getPost} = nextProps, {id: nextId} = meta.match;
        let nextPostExists = (nextId && posts && posts.all && typeof posts.all[nextId] !== 'undefined');

        if (nextId && !nextPostExists || curId !== nextId) { getPost(nextId); }
    }
*/


    componentWillReceiveProps(nextProps) {
        const {meta, posts, getPost} = nextProps, {id} = meta.match;
        let postExists = (id && posts && posts.all && typeof posts.all[id] !== 'undefined');

        if (id && !postExists) { getPost(id); }
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
                        <VoteUpDown id={postId} score={voteScore} />
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
                        <p><Link to={`/post/edit/${postId}`}>Edit post &raquo;</Link></p>
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
            return apiFetch({action: "post", type: "get", body: { id }}).then((post) => (
                dispatch(getPost(post)))
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
