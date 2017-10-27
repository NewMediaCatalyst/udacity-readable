// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';
import VoteUpDown from './VoteUpDown';


class Post extends Component {

    static propTypes = {
        postID: PropTypes.string.isRequired
    }

    // TODO: replace use of uuid generation
    state = {
        postDate: new Date().toISOString(),
        postVoteScore: 10,
        category: 'btc'
    }

    render() {
        const {postID} = this.props;
        let {postDate, postVoteScore, category} = this.state;

        return (
            <div className="view-post-detail">
                <h1 className="post-title">{postID}</h1>
                <Row margin={true} className="post-header">
                    <Col width={{sm:12, md:5, lg:4}} className="post-author">
                        <p>
                            <strong>By: </strong>
                            <span className="text text-author">Sandy Wheelhouse</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:7, lg:4}} className="post-date">
                        <p>
                            <strong>Published: </strong>
                            <DateTime date={postDate} />
                        </p>
                    </Col>
                    <Col width={{sm:12, md:7, lg:4}} className="post-score">
                        <VoteUpDown score={postVoteScore} />
                    </Col>
                </Row>
                <Row margin={true} className="post-body">
                    <Col width={{sm:12, lg:12}} className="post-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae velit sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eros lacus, rhoncus ac imperdiet vitae, malesuada eu lectus. Duis aliquet, lorem ut cursus mollis, eros leo egestas purus, sit amet euismod nulla mi ac enim. Ut congue eros sit amet mauris placerat euismod. Aliquam sagittis erat egestas dui imperdiet, eu lacinia ex cursus. Pellentesque tincidunt sollicitudin tincidunt. Nam id dui sem. Ut hendrerit ut tellus at egestas. Sed vehicula nisl eget felis egestas, id sollicitudin est vestibulum. Nulla suscipit turpis vel vestibulum tristique. Donec posuere tempor mi, sit amet scelerisque velit lacinia eu.</p>
                        <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. In varius rutrum ultricies. Integer ut nisl aliquam, bibendum nibh et, tristique mi. Nunc interdum ante ac placerat vestibulum. Vivamus leo libero, vehicula a nisi a, vulputate dignissim tellus. Nam finibus metus ante, in vestibulum eros feugiat ac. Curabitur justo quam, malesuada non eros vitae, egestas viverra lorem. Donec auctor ex sed posuere malesuada.</p>
                    </Col>
                </Row>
                <Row margin={true} className="post-footer">
                    <Col width={{sm:12, md:4, lg:4}} className="post-id">
                        <p>
                            <strong>Post ID: </strong>
                            <span className="text text-uuid">{postID}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:3, lg:3}} className="post-category">
                        <p>
                            <strong>Category: </strong>
                            <span className="text">{category}</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:5, lg:5}} className="post-edit">
                        <p><Link to={`/post/edit/${postID}`}>Edit post</Link></p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Post;
