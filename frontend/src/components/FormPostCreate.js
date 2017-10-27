// libs
import React, { Component } from 'react';
import uuidV4 from 'uuid.v4';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';


class FormPostCreate extends Component {

    state = {
        postID: uuidV4(),
        postDate: new Date().toISOString()
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("clicked button: ", e);
    }

    render() {
        let {postID, postDate} = this.state;

        return (
            <div className="view-post-create">
                <h1>Create New Post</h1>
                <form>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="post-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{postID}</span>
                                        <input id="post-uuid" type="hidden" value={postID} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={postDate} />
                                        <input id="post-date" type="hidden" value={postDate} />
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
                                        <input id="post-author" type="text" placeholder="Post Author" />
                                    </Col>
                                    <Col width={{sm:12,md:6,lg:4}} className="post-title">
                                        <label htmlFor="post-cat">Category</label>
                                        <select id="post-cat">
                                            <option value="">Select Category</option>
                                            <option value="btc">Bitcoin</option>
                                            <option value="eth">Ethereum</option>
                                            <option value="ltc">Litecoin</option>
                                            <option value="xrp">Ripple</option>
                                        </select>
                                    </Col>
                                    <Col width={{sm:12,md:12,lg:12}} className="post-title">
                                        <label htmlFor="post-title">Title</label>
                                        <input id="post-title" type="text" placeholder="Post title" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-body">
                                        <label htmlFor="post-body">Body</label>
                                        <textarea id="post-body"></textarea>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="form-actions">
                                        <button onMouseUp={this.handleSubmit} type="submit">
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
}

export default FormPostCreate;
