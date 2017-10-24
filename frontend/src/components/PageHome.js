// libs
import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

// app
import '../css/app.css';
import Row from './GridRow';
import Col from './GridColumn';

class PageHome extends Component {

    render() {
        return (
            <main className="app-content" role="main">
                <h1>Create New Article</h1>
                <Row margin={true}>
                    <Col width={{sm:12, md:3, lg:4}} className="post-details">
                        <fieldset>
                            <legend>Details</legend>
                            <Row>
                                <Col width={{sm:12, lg:12}} className="post-id">
                                    <label>ID</label>
                                    <span className="input-text">UUID</span>
                                </Col>
                                <Col width={{sm:12, lg:12}} className="post-date">
                                    <label>Date</label>
                                    <span className="input-text">Oct 24, 2017 11:08 AM</span>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                    <Col width={{sm:12, md:9,lg:8}} className="post-main">
                        <fieldset>
                            <legend>Post</legend>
                            <Row margin={true}>
                                <Col width={{sm:12,md:6,lg:8}} className="post-title">
                                    <label htmlFor="post-title">Title</label>
                                    <input id="post-title" type="text" placeholder="Article title" />
                                </Col>
                                <Col width={{sm:12,md:6,lg:4}} className="post-title">
                                    <label htmlFor="post-cat">Category</label>
                                    <select id="post-cat">
                                        <option value="">Select</option>
                                        <option value="btc">Bitcoin</option>
                                        <option value="eth">Ethereum</option>
                                        <option value="ltc">Litecoin</option>
                                        <option value="xrp">Ripple</option>
                                    </select>
                                </Col>
                                <Col width={{sm:12,lg:12}} className="post-body">
                                    <label htmlFor="post-body">Body</label>
                                    <textarea id="post-body"></textarea>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
            </main>
        );
    }
}

export default PageHome;
