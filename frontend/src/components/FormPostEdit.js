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
import {getPost, updatePost} from '../actions/posts';
import {setPageTitle} from '../actions/meta';


class FormPostEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: new Post(),
            matchId: "",
            touched: {
                author: false,
                category: false,
                title: false,
                voteScore: false,
                body: false
            },
            showMessage: false
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handlePostUpdate = this.handlePostUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {},
        match: {},
        message: {
            success: ["Success!", "post was edited!"],
            error: ["Error! Editing post", "failed!"]
        },
        title: { page: "Edit Post" }
    }

    componentDidMount() {
        const {match, posts, title, setPageTitle} = this.props,
              {all, display} = posts,
              matchId = (match && match.params && typeof match.params.id !== 'undefined') ? match.params.id : "";
        let displayId = display[0] || "";

        if (matchId !== "") {
            this.setState({ matchId: matchId });
            getPost(matchId);
        }
        if (!_.isUndefined(display) && displayId.length > 0) {
            this.setState({ post: all[displayId] });
        }
        setPageTitle({page: title.page});
    }

    shouldComponentUpdate(nextProps) {
        let {post} = this.state,
            nextMatchId = (nextProps.match && nextProps.match.params && typeof nextProps.match.params.id !== 'undefined') ? nextProps.match.params.id : "";
        const {posts} = this.props, {all, display} = posts;
        return (all !== nextProps.posts.all || (!_.isUndefined(display[0])) || nextMatchId !== post.id);
    }

    componentWillReceiveProps(nextProps) {
        const {posts} = this.props, {all, display} = posts;
        let {post} = this.state, displayId = display[0] || "";

        if (all !== nextProps.posts.all || !_.isUndefined(display) || (displayId.length > 0 && post.id !== displayId)) {
            this.setState({ post: all[displayId] });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.updateTimer);
        clearTimeout(this.closeTimer);
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
        const {posts} = this.props, {all, display} = posts;
        this.setState({ post: all[display[0]] });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {updatePost} = this.props;
        let {post} = this.state;
        if (this.isInvalidForm(this.validate)) {
            updatePost(post);
            this.setState({ showMessage: true });
            this.updateTimer = setTimeout(this.handlePostUpdate, 350);
            this.closeTimer = setTimeout(this.handleCloseMessage, 9000);
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
                        <Link className="message-link" to={`/post/${id}`}>View post &raquo;</Link>
                        <Link className="message-link" to="/posts/">View post in listing &raquo;</Link>
                    </p>
                </div>}
                <form onSubmit={this.handleSubmit}>
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
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
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
                                            onChange={this.handleChange}
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
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
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
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
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
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
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
                                        <textarea onBlur={this.handleBlur} onChange={this.handleChange} name="body" value={body} id="post-body" />
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
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => {
            return apiFetch({action: "post", type: "get", body: { id }})
                .then((post) => dispatch(getPost(post)))
        },
        updatePost: (post) => apiFetch({action: "post", type: "edit", body: post})
            .then((res) => dispatch(updatePost(res))),
        setPageTitle: (title) => dispatch(setPageTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPostEdit);
