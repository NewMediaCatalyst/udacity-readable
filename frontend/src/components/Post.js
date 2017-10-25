// libs
import React, { Component } from 'react';

// app
import Row from './GridRow';
import Col from './GridColumn';


class Post extends Component {

    render() {
        return (
            <div className="post-create">
                <h1>'Yadda' Post</h1>
                <Row margin={true}>
                    <Col width={{sm:12, md:3, lg:4}} className="post-details">
                        <Row>
                            <Col width={{sm:12, lg:12}} className="post-id">
                                <label>ID:</label>
                                <span className="input-text text-uuid">UUID</span>
                            </Col>
                            <Col width={{sm:12, lg:12}} className="post-date">
                                <label>Date:</label>
                                <span className="input-text text-date">Oct 24, 2017 11:08 AM</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Post;
