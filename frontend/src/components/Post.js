// libs
import React, { Component } from 'react';

// app
import Row from './GridRow';
import Col from './GridColumn';


class Post extends Component {

    render() {
        return (
            <div className="view-post-detail">
                <h1 className="post-title">'Yadda' Post</h1>
                <Row margin={true} className="post-header">
                    <Col width={{sm:12, md:5, lg:3}} className="post-author">
                        <p>
                            <strong>By: </strong>
                            <span className="text text-author">Sandy Wheelhouse</span>
                        </p>
                    </Col>
                    <Col width={{sm:12, md:7, lg:4}} className="post-date">
                        <p>
                            <strong>Published: </strong>
                            <time datetime="" className="text text-date">Oct 24, 2017 11:08 AM</time>
                        </p>
                    </Col>
                </Row>
                <Row margin={true} className="post-body">
                    <Col width={{sm:12, lg:12}} className="post-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae velit sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eros lacus, rhoncus ac imperdiet vitae, malesuada eu lectus. Duis aliquet, lorem ut cursus mollis, eros leo egestas purus, sit amet euismod nulla mi ac enim. Ut congue eros sit amet mauris placerat euismod. Aliquam sagittis erat egestas dui imperdiet, eu lacinia ex cursus. Pellentesque tincidunt sollicitudin tincidunt. Nam id dui sem. Ut hendrerit ut tellus at egestas. Sed vehicula nisl eget felis egestas, id sollicitudin est vestibulum. Nulla suscipit turpis vel vestibulum tristique. Donec posuere tempor mi, sit amet scelerisque velit lacinia eu.</p>
                        <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. In varius rutrum ultricies. Integer ut nisl aliquam, bibendum nibh et, tristique mi. Nunc interdum ante ac placerat vestibulum. Vivamus leo libero, vehicula a nisi a, vulputate dignissim tellus. Nam finibus metus ante, in vestibulum eros feugiat ac. Curabitur justo quam, malesuada non eros vitae, egestas viverra lorem. Donec auctor ex sed posuere malesuada.</p>
                    </Col>
                </Row>
                <Row margin={true} className="post-footer">
                    <Col width={{sm:12, lg:12}} className="post-id">
                        <p>
                            <strong>ID: </strong>
                            <span className="text text-uuid">UUID</span>
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Post;
