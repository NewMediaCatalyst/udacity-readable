// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {apiFetch} from '../utils/api';
import {getPost, updatePost} from '../actions/posts';


class FormPostEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: {},
            matchId: "",
            touched: {
                author: false,
                category: false,
                title: false,
                voteScore: false,
                body: false
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        posts: {},
        match: {}
    }

    componentDidMount() {
        const {match} = this.props,
              matchId = (match && match.params && typeof match.params.id !== 'undefined')
                ? match.params.id : "";
        if (matchId !== "") {
            this.setState({ matchId: matchId });
            getPost(matchId);
        }
    }

    shouldComponentUpdate(nextProps) {
        let {post, matchId} = this.state;
        const nextMatchId = (nextProps.match
            && nextProps.match.params && typeof nextProps.match.params.id !== 'undefined')
                ? nextProps.match.params.id : "";
        console.log("shouldComponentUpdate :: _.isEmpty(post): ", _.isEmpty(post), "; match !== nextProps.match: ", matchId !== nextProps.match);
        console.log("shouldComponentUpdate :: state.matchId: ",  matchId, "; nextProps.match: ", nextProps.match, "; nextMatchId: ", nextMatchId);
        // return _.isEmpty(post) || matchId !== nextMatchId;
        // TODO: update to correct shouldComponentUpdate state
        return true;
    }

    componentWillReceiveProps(nextProps) {
        let {matchId, post} = this.state;
        const {posts, match} = this.props,
            nextMatchId = (nextProps.match && nextProps.match.params
                && typeof nextProps.match.params.id !== 'undefined')
                ? nextProps.match.params.id : "";
        if (matchId !== "") {
            this.setState({ matchId: matchId });
            getPost(matchId);
        }

        console.log("00 componentWillReceiveProps :: posts: ",  posts, "; match: ", match, "; nextProps.match: ", nextProps.match);
        console.log("01 componentWillReceiveProps :: post: ",  post);
        console.log("02 componentWillReceiveProps :: nextProps: ",  nextProps);

        if (_.isEmpty(post)) {
            if (matchId !== "") {
                this.setState({ post: nextProps.posts.display[matchId] });
            }
            console.log("03 componentWillReceiveProps :: _.isEmpty(post): ", _.isEmpty(post));
            this.setState({ post: nextProps.posts.display[nextMatchId] });
        }
    }


    handleBlur(e) {
        const target = e.target, name = target.name;
        let updateTouch = Object.assign({}, this.state.touched);
        updateTouch[name] = true;
        this.setState({ touched: updateTouch });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {updatePost} = this.props;
        let {post} = this.state;
        if(this.isInvalidForm(this.validate)) {
            updatePost(post);
        }
    }

    handleChange(e) {
        const target = e.target, {name, type} = target;
        let newPost = Object.assign({}, this.state.post);

        newPost.details[name] = type === 'checkbox' ? target.checked : target.value;
        console.log("01 :: handleChange: newPost: ", newPost);
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

    renderNoResults() {
        return <div className="no-results">Missing ID. Unable to edit</div>
    }

    renderPost() {
        let {post, touched} = this.state,
            {id, title, author, timestamp, category,
                body, voteScore, deleted
            } = post,
            errors = this.validateForm();
        console.log("renderPost :: post: ", post);


        return (
            <div className="view-post-edit">
                <h1>Edit Post</h1>
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

    render() {
        let {post} = this.state;
        console.log("FormPostEdit :: render :: state.post: ", post);
        return (post && typeof post.id !== 'undefined')
            ? this.renderPost() : this.renderNoResults();
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
            .then((res) => dispatch(updatePost(res)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPostEdit);
