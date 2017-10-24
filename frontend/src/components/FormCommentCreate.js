// libs
import React, { Component } from 'react';

// app
import Row from './GridRow';
import Col from './GridColumn';


class FormCommentCreate extends Component {

    handleSubmit(e) {
        e.preventDefault();
        console.log("clicked button: ", e);
    }

    render() {
        return (
            <div className="comment-create">
                <h1>Comment</h1>
                <form>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="comment-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Comment ID:</label>
                                        <span className="input-text text-uuid">UUID</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">UUID</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-date">
                                        <label>Date:</label>
                                        <span className="input-text text-date">Oct 24, 2017 11:08 AM</span>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="comment-main">
                            <fieldset>
                                <Row margin={true}>
                                    <Col width={{sm:12, lg:12}} className="comment-title">
                                        <label htmlFor="comment-title">Author:</label>
                                        <input id="comment-title" type="text" placeholder="Author name" />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-body">
                                        <label htmlFor="comment-body">Body:</label>
                                        <textarea id="comment-body" placeholder="Comment body"></textarea>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="form-actions">
                            <button onMouseUp={this.handleSubmit} type="submit">
                                <span className="text">Submit</span>
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

export default FormCommentCreate;
