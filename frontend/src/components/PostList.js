// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import '../css/comp.postlist.css';
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import {setSamplePostData, Post} from '../utils/data.js';


class PostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allPostData: setSamplePostData(),
            postData: [new Post()]
        }
    }

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    static defaultProps = {
        category: "all"
    }

    componentDidMount() {
        const {category} = this.props;
        let {allPostData} = this.state,
            newPostData = category !== "all" ?
                allPostData.filter((post) => post.category === category && !post.deleted)
                : allPostData.filter((post) => !post.deleted);
        this.setState({ postData: newPostData });
    }

    componentWillReceiveProps(nextProps) {
        const {category} = this.props;
        let newPostData, {allPostData} = this.state;

        if (category !== nextProps.category) {
            if (allPostData === undefined && allPostData.length > 0) {
                this.setState({ allPostDate: setSamplePostData() });
            }
             newPostData = nextProps.category !== "all" ?
                allPostData.filter((post) => post.category === nextProps.category && !post.deleted)
                : allPostData.filter((post) => !post.deleted);
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
