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
import {showAllPosts, filterPostsByCat} from '../actions/posts';


class PostList extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired,
        posts: PropTypes.object.isRequired
    }

    static defaultProps = {
        category: "all",
        posts: {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {posts} = this.props;
        return (posts && posts !== nextProps.posts);
    }

    renderPosts() {
        let {posts} = this.props;

        return <ol className="post-list">
            {Object.entries(posts.display).map(([key, value]) => (
                <li className="list-item" key={value.id}>
                    <Link className="post-link" to={`/post/${value.id}`}>
                    <h2 className="post-title">{value.title}</h2>
                    <p className="post-meta">
                        <DateTime date={value.timestamp} />
                        <span className="post-author"><strong>by: </strong>{value.author}</span>
                        <span className="post-category"><strong>In: </strong>{value.category}</span>
                        <span className="post-score"><strong>Score: </strong>{value.voteScore}</span>
                    </p>
                    </Link>
                </li>
             ))}
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
        showPost: (id) => dispatch(showAllPosts(id)),
        showAllPosts: (category) => dispatch(showAllPosts(category)),
        filterPostsByCat: (category) => dispatch(filterPostsByCat(category))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
