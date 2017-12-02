// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


// app
import '../css/comp.postlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
// app: actions
import {setCategory} from '../actions/categories';
import {showAllPosts, filterPostsByCat, getPostsAll} from '../actions/posts';
// app: api calls
import {apiGetPostsAll} from '../utils/api-posts';

class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasFiltered: false,
            hasPosts: false
        }
    }

    static propTypes = {
        category: PropTypes.string.isRequired,
        posts: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    }

    static defaultProps = {
        category: "all",
        posts: {},
        match: { params: undefined }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {posts, category} = this.props;
        let {hasFiltered, hasPosts} = this.state;

        return !hasFiltered || !hasPosts || nextProps.category !== category || nextProps.posts.display !== posts.display;
    }

    componentDidMount() {
        const {category, getPostsAll} = this.props;

        getPostsAll(category); // required for setting initial navigation and settings
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {category, posts, showAllPosts, setCategory, filterPostsByCat} = this.props,
              nextCategory = nextProps.category, nextPosts = nextProps.posts;
        let {hasFiltered} = this.state;

        if ((posts && posts.length > 0) || (nextPosts && nextPosts.length > 0)) {
            this.setState({ hasPosts: true });
        }

        if (!hasFiltered) {
            setCategory(nextCategory);
            nextCategory === "all" ? showAllPosts() : filterPostsByCat(nextCategory);
            this.setState({ hasFiltered: true });

        } else if (category !== nextCategory) {
            setCategory(nextCategory);
            nextCategory === "all" ? showAllPosts() : filterPostsByCat(nextCategory);
        }

    }

    renderPosts() {
        let {posts} = this.props, {all, display} = posts;

        return <ol className="post-list">
            {display.map((key) => {
                const {id, title, timestamp, author, category, voteScore, commentCount} = all[key];
                return <li className="list-item" key={id}>
                    <Link className="post-link" to={`/post/${id}`}>
                    <h2 className="post-title">{title}</h2>
                    <p className="post-meta">
                        <DateTime date={timestamp} />
                        <span className="post-author"><strong>by: </strong>{author}</span>
                        <span className="post-category"><strong>In: </strong>{category}</span>
                        <span className="post-score"><strong>Score: </strong>{voteScore}</span>
                        <span className="post-comments"><strong>Comments: </strong>{commentCount}</span>
                    </p>
                    </Link>
                </li>
                }
            )}
        </ol>
    }

    renderNoResults() {
        return (
            <Col width={{sm:12}} className="no-results">
                <p>
                    <span className="text">Currently, no posts. </span>
                    <Link className="add-post-link" to="/post/create">Add a post &raquo;</Link>
                </p>
            </Col>
        );
    }

    render() {
        const {posts} = this.props;

        return (
            <Row className="post-listing">
                {posts ? this.renderPosts() : this.renderNoResults() }
            </Row>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        category: state.category,
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategory: (category) => dispatch(setCategory(category)),
        showPost: (id) => dispatch(showAllPosts(id)),
        showAllPosts: () => dispatch(showAllPosts()),
        filterPostsByCat: (category) => dispatch(filterPostsByCat(category)),
        getPostsAll: (category) => apiGetPostsAll()
            .then((posts) => (dispatch(getPostsAll({posts, category}))))
            .then((posts) => (category !== "all")
                ? dispatch(filterPostsByCat(category))
                : dispatch(showAllPosts()))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
