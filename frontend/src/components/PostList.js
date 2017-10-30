// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import '../css/comp.postlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {setSamplePostData} from '../utils/data.js';


class PostList extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    static defaultProps = {
        category: "all"
    }

    state = {
        postData: setSamplePostData()
    }

    componentDidMount() {
        let newPostData,
            {postData} = this.state,
            {category} = this.props;

        if (category !== "all") {
            newPostData = postData.filter((post) => post.category === category);
            this.setState({ postData: newPostData });
        }
    }

    componentWillReceiveProps(nextProps) {
        let newPostData,
            {category} = this.props;

        if (category !== nextProps.category) {
            newPostData = setSamplePostData();
            newPostData = newPostData.filter(post => post.category === nextProps.category);
            this.setState({ postData: newPostData});
        }
    }

    renderPosts() {
        let {postData} = this.state;

        return <ol className="post-list">
            {postData.map((post) => (
                <li className="list-item" key={post.id}>
                    <Link className="post-link" to={`/post/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-meta">
                        <DateTime date={post.timestamp} />
                        <span className="post-author"><strong>by: </strong>{post.author}</span>
                        <span className="post-category"><strong>In: </strong>{post.category}</span>
                    </p>
                    </Link>
                </li>
             ))}
        </ol>
    }

    renderNoResults() {
        return (
            <Col width={{sm:12}} className="no-results">
                <p>Currently, no posts</p>
            </Col>
        );
    }

    render() {
        let {postData} = this.state;

        return (
            <Row className="post-listing">
                {(postData !== undefined && postData.length > 0) ?
                    this.renderPosts() : this.renderNoResults() }
            </Row>
        );
    }
}

export default PostList;
