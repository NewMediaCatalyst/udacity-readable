// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';


class FormPostEdit extends Component {

    static propTypes = {
        postID: PropTypes.string.isRequired,
        postDate: PropTypes.string.isRequired
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("clicked button: ", e);
    }

    render() {
        let {postID, postDate} = this.props;

        return (
            <div className="view-post-edit">
                <h1>Edit Post</h1>
                <form>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="post-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{postID}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-date">
                                        <label>Post Date:</label>
                                        <DateTime date={postDate} />
                                        <input id="post-date" type="hidden" value={postDate} />
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="post-deleted">
                                        <label>Post Active:</label>
                                        <input id="post-deleted" type="checkbox" />
                                        <label htmlFor="post-deleted">Delete post</label>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>
                        <Col width={{sm:12, md:9,lg:8}} className="post-main">
                            <fieldset>
                                <legend>Post:</legend>
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

export default FormPostEdit;