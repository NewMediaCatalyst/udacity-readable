// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {Post} from '../utils/data';
import {apiFetch} from '../utils/api';
import {addPost} from '../actions/posts';
import {setPageTitle} from '../actions/meta';


class FormPostCreate extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            post: new Post(),
            touched: {
                author: false,
                title: false,
                category: false,
                body: false,
                voteScore: false
            },
            showMessage: false,
            prevPost: {
                id: "",
                cat: ""
            }
        }
    }

    static propTypes = {
        message: PropTypes.object.isRequired
    }

    static defaultProps = {
        message: {
            success: ["Success!", "Post was created!"],
            error: ["Error!", "Creating post failed!"]
        },
        title: { page: "Create Post" }
    }

    componentDidMount() {
        const {title, setPageTitle} = this.props;
        setPageTitle({page: title.page});
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({ touched: updateTouch });
    }

    handleChange(e) {
        const target = e.target,
              type = e.target.type,
              value = type === 'checkbox' ? target.checked : target.value,
              name = e.target.name;
        let newPost = Object.assign({}, this.state.post);
        newPost[name] = value;

        this.setState({ post: newPost });
    }

    handleCloseMessage() {
        this.setState({ showMessage: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {addPost} = this.props;
        let {post} = this.state,
            prevPost = {
                id: post.id,
                cat: post.category
            }

        if (this.isInvalidForm(this.validateForm)) {
            addPost(post);
            this.closeTimer = setTimeout(() => this.handleCloseMessage(), 9000);
            this.resetForm(prevPost);
        }
    }

    resetForm(prevPost) {
        this.setState(Object.assign(this.initState(),
            {showMessage: true, prevPost}
        ));
    }

    validate() {
        let {post} = this.state,
            {title, author, category, body, voteScore} = post;

        return {
            author: author === "",
            title: title === "",
            category: category === "",
            body: body === "",
            voteScore: voteScore === "" || isNaN(voteScore)
        }
    }

    isInvalidForm(errors) {
        if (errors === undefined) { return true; }
        return Object.keys(errors).some(error => errors[error]);
    }

    render() {
        let {post, touched, showMessage, prevPost} = this.state,
            {id, title, author, timestamp, category, body, voteScore, deleted} = post,
            errors = this.validate();
        const {message} = this.props,
              successHeading = message.success[0],
              successText = message.success[1],
              newPostLink = `/${prevPost.cat}/${prevPost.id}`;

        return (
            <div className="view-post-create">
                <h1>Create New Post</h1>
                {showMessage && <div className="callout message success">
                    <h3>{successHeading}</h3>
                    <p><span>{`${successText} `}</span>
                        <Link className="message-link" to={newPostLink}>View new post &raquo;</Link>
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
                                        <input id="post-uuid" name="id" type="hidden" value={id} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={timestamp} />
                                        <input id="post-date" name="timestamp" type="hidden" value={timestamp} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label htmlFor="post-score">Post Score:</label>
                                        <input
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.voteScore && errors.voteScore ? 'is-invalid-input': null}
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
                                            value={author}
                                            id="post-author"
                                            name="author"
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
                                            value={category}
                                            id="post-cat"
                                            name="category"
                                        >
                                            <option value="">Select Category</option>
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
                                            value={title}
                                            id="post-title"
                                            name="title"
                                            type="text"
                                            placeholder="Post title"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-body">
                                        <label htmlFor="post-body">Body</label>
                                        <textarea
                                            onBlur={(ev) => this.handleBlur(ev)}
                                            onChange={(ev) => this.handleChange(ev)}
                                            className={touched.body && errors.body ? 'is-invalid-input' : null}
                                            value={body}
                                            id="post-body"
                                            name="body"
                                            placeholder="Post body"
                                        />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button disabled={this.isInvalidForm(errors)} type="submit">
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

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => apiFetch({action: 'post', type: 'add', body: post})
            .then((post) => dispatch(addPost(post))),
        setPageTitle: (title) => dispatch(setPageTitle(title))
    };
}

export default connect(null, mapDispatchToProps)(FormPostCreate);
