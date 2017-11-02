// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import '../css/comp.postlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';


class PostList extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired,
        posts: PropTypes.object.isRequired
    }

    static defaultProps = {
        category: "all"
    }

    componentDidMount() {
        // const {category, posts} = this.props;
        // TODO: add method to weed out deleted posts
    }

    componentWillReceiveProps(nextProps) {
        const {category, posts} = this.props;

        if (category !== nextProps.category) {
            Object.entries(posts).map(([key, value]) => console.log("key: ", key, "; value: ", value))
            // TODO: add method to weed out deleted posts
        }
    }

    renderPosts() {
        let {posts} = this.props;

        return <ol className="post-list">
            {Object.entries(posts).map(([key, value]) => (
                <li className="list-item" key={value.id}>
                    <Link className="post-link" to={`/post/${value.id}`}>
                    <h2 className="post-title">{value.title}</h2>
                    <p className="post-meta">
                        <DateTime date={value.timestamp} />
                        <span className="post-author"><strong>by: </strong>{value.author}</span>
                        <span className="post-category"><strong>In: </strong>{value.category}</span>
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
        let {posts} = this.props;

        return (
            <Row className="post-listing">
                {posts ? this.renderPosts() : this.renderNoResults() }
            </Row>
        );
    }
}

export default PostList;
