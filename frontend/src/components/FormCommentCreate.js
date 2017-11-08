// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidV4 from 'uuid.v4';
import {connect} from 'react-redux';

// app
import Row from './GridRow';
import Col from './GridColumn';
import DateTime from './DateTime';


class FormCommentCreate extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    state = {
        commentID: uuidV4(),
        commentDate: new Date().toISOString()
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("clicked button: ", e);
    }

    render() {
        const {post} = this.props, {id} = post;
        let {commentID, commentDate} = this.state;

        return (
            <div id="comment-create" className="view-comment-create">
                <h3>Want to comment?</h3>
                <form>
                    <Row margin={true}>
                        <Col width={{sm:12, md:3, lg:4}} className="comment-details">
                            <fieldset>
                                <legend>Details:</legend>
                                <Row>
                                    <Col width={{sm:12, lg:12}} className="comment-id">
                                        <label>Comment ID:</label>
                                        <span className="input-text text-uuid">{commentID}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-post-id">
                                        <label>Post ID:</label>
                                        <span className="input-text text-uuid">{id}</span>
                                    </Col>
                                    <Col width={{sm:12, lg:12}} className="comment-date">
                                        <label>Comment Date:</label>
                                        <DateTime date={commentDate} />
                                        <input id="comment-date" type="hidden" value={commentDate} />
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

function mapStateToProps(state) {
    return {
        post: state.post
    };
}

export default connect(mapStateToProps)(FormCommentCreate);
