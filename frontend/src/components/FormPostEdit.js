// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {Post} from '../utils/data';
import {apiFetch} from '../utils/api';
import {setPost, updatePost} from '../actions/posts';
import {setPageTitle} from '../actions/meta';


class FormPostEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: new Post(),
            touched: {
                author: false,
                category: false,
                title: false,
                voteScore: false,
                body: false
            },
            showMessage: false
        };
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {},
        match: {},
        url: "/comment/edit/",
        message: {
            success: ["Success!", "post was edited!"],
            error: ["Error! Editing post", "failed!"]
        },
        title: { page: "Edit Post" }
    }

    componentDidMount() {
        const {meta, posts, title, setPageTitle, getPost} = this.props,
            {all} = posts,
            {id: metaId} = meta;
        let urlId = window.location.pathname.replace("/post/edit/", ""),
            theId = metaId || urlId;

        if (_.isEmpty(all) || _.isUndefined(all[theId])) {
            getPost(theId);
        } else if (!_.isEmpty(all[theId])) {
            this.setState({ post: all[theId] });
            setPageTitle({page: title.page});
        }

    }

    componentWillReceiveProps(nextProps) {
        const {getPost} = this.props,
            {meta: nextMeta, posts: nextPosts} = nextProps,
            {all: nextAll} = nextPosts, {id: nextMetaId} = nextMeta;
        let urlId = window.location.pathname.replace("/post/edit/", ""),
            theId = nextMetaId || urlId;

        if (!_.isUndefined(nextAll[theId])) {
            this.setState({ post: nextAll[theId] });
        } else if (_.isEmpty(nextAll) || _.isUndefined(nextAll[theId])) {
            getPost(theId);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.updateTimer);
        clearTimeout(this.closeTimer);
    }

    getIdFromUrl() {
        const {url} = this.props,
            slashCount = url.match(/\//g).length;
        return window.location.pathname.split("/")[slashCount];
    }

    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({ touched: updateTouch });
    }

    handleCloseMessage() {
        this.setState({ showMessage: false });
    }

    handlePostUpdate() {
        const {posts} = this.props, {all} = posts,
            postID = this.getIdFromUrl();
        this.setState({ post: all[postID] });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {updatePost} = this.props;
        let {post} = this.state;

        if (this.isInvalidForm(this.validate)) {
            updatePost(post);
            this.setState({ showMessage: true });
            this.updateTimer = setTimeout(() => this.handlePostUpdate(), 350);
            this.closeTimer = setTimeout(() => this.handleCloseMessage(), 9000);
        }
    }

    handleChange(e) {
        const target = e.target, {name, type} = target;
        let newPost = Object.assign({}, this.state.post);
        newPost[name] = type === 'checkbox' ? target.checked : target.value;
        this.setState({ post: newPost });
    }

    isInvalidForm(errors) {
        if (errors === undefined) { return true; }
        return Object.keys(errors).some(error => errors[error]);
    }

    validateForm() {
        let {title, author, category, body, voteScore} = this.state.post;

        return {
            author: author === "",
            title: title === "",
            category: category === "",
            body: body === "",
            voteScore: voteScore === "" || isNaN(voteScore)
        }
    }

    render() {
        let {post, touched, showMessage} = this.state;
        const {message} = this.props;

        let {id, title, author, timestamp, category, body, voteScore, deleted} = post,
            errors = this.validateForm(),
            successHeading = message.success[0],
            successText = message.success[1];

        return (
            <div className="view-post-edit">
                <h1>Edit Post</h1>
                {showMessage && <div className="callout message success">
                    <h3>{successHeading}</h3>
                    <p><strong>{title}</strong> <span>{successText}</span><br />
                        <Link className="message-link" to={`/${category}/${id}`}>View post &raquo;</Link>
                        <Link className="message-link" to="/posts/">View post in listing &raquo;</Link>
                    </p>
                </div>}
                <form onSubmit={(ev) => this.handleSubmit(ev)}>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="post-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={timestamp} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label htmlFor="post-score">Post Score:</label>
                                        <input
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.voteScore && errors.voteScore ? 'is-invalid-input' : null}
                                            name="voteScore"
                                            value={voteScore}
                                            id="post-score"
                                            type="number"
                                            step="1"
                                            min="1"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label>Post Active:</label>
                                        <input
                                            onChange={(ev) => this.handleChange(ev)}
                                            name="deleted"
                                            checked={deleted}
                                            id="post-deleted"
                                            type="checkbox"
                                        />
                                        <label htmlFor="post-deleted">Delete post</label>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="post-main">
                            <fieldset>
                                <legend>Post:</legend>
                                <Row margin={true}>
                                    <Col width={{sm:12,md:6,lg:8}} className="post-author">
                                        <label htmlFor="post-author">Author Name</label>
                                        <input
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.author && errors.author ? 'is-invalid-input' : null}
                                            name="author"
                                            value={author}
                                            id="post-author"
                                            type="text"
                                            placeholder="Post Author"
                                        />
                                    </Col>
                                    <Col width={{sm:12,md:6,lg:4}} className="post-title">
                                        <label htmlFor="post-cat">Category</label>
                                        <select
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.category && errors.category ? 'is-invalid-input' : null}
                                            name="category"
                                            value={category}
                                            id="post-cat"
                                        >
                                            <option value="">Select</option>
                                            <option value="btc">Bitcoin</option>
                                            <option value="eth">Ethereum</option>
                                            <option value="ltc">Litecoin</option>
                                            <option value="xrp">Ripple</option>
                                        </select>
                                    </Col>
                                    <Col width={{sm:12,md:12,lg:12}} className="post-title">
                                        <label htmlFor="post-title">Title</label>
                                        <input
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.title && errors.title ? 'is-invalid-input' : null}
                                            name="title"
                                            value={title}
                                            id="post-title"
                                            type="text"
                                            placeholder="Article title"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-body">
                                        <label htmlFor="post-body">Body</label>
                                        <textarea
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            name="body"
                                            value={body}
                                            id="post-body"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button
                                            disabled={this.isInvalidForm(errors) ? true : null}
                                            type="submit">
                                            <span className="text">Submit</span>
                                        </button>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        meta: state.meta
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => {
            return apiFetch({action: "post", type: "get", body: { id }})
                .then((post) => dispatch(setPost(post)))
        },
        updatePost: (post) => apiFetch({action: "post", type: "edit", body: post})
            .then((res) => dispatch(updatePost(res))),
        setPageTitle: (title) => dispatch(setPageTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPostEdit);
