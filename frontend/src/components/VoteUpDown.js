// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import uuidV4 from 'uuid.v4';
import classnames from 'classnames';
import {connect} from 'react-redux';

// app
import Row from './GridRow';
import {apiFetch} from '../utils/api';
import {votePost} from '../actions/posts';
import {voteComment} from '../actions/comments';
// app: styles
import '../css/comp.voteupdown.css';


class VoteUpDown extends Component {

    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
        this.state = {
            ctrlID: uuidV4().slice(0,8),
            score: this.props.score
        }
    }

    static propTypes = {
        score: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        layout: PropTypes.string.isRequired,
        align: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }

    static defaultProps = {
        score: 0,
        size: "",
        type: "post",
        layout: "l2r",
        align: "align-right",
        id: ""
    }

    handleUpVote(e) {
        e.preventDefault(); e.stopPropagation();
        const {type, id, voteComment, votePost} = this.props;
        let {score} = this.state, details = {id, option: "upVote"};

        console.log("00 handleUpVote :: type: ", type, "; id: ", id, "; score: ", score);

        this.setState({ score: Number(score) + 1 })

        type === "comment" ? voteComment(details) : votePost(details);
    }

    handleDownVote(e) {
        e.preventDefault(); e.stopPropagation();
        const {type, id, voteComment, votePost} = this.props;
        let details, {score} = this.state,
            numScore = Number(score);

        console.log("00 handleDownVote :: type: ", type, "; id: ", id, "; score: ", score, "; numScore: ", numScore);

        if (numScore >= 2) {
            console.log("01 handleDownVote :: (score >= 2): ");
            this.setState({ score: numScore - 1 });
            details = {id, option: "downVote"};
            type === "comment" ? voteComment(details) : votePost(details);
        }

    }

    render() {
        const {score, size, type, layout, align} = this.props;
        let {ctrlID} = this.state,
            titleUp = `${type} +1`,
            titleDown = `${type} -1`,
            buttonSRTextUp = `Vote ${type.toLowerCase()} up 1`,
            buttonSRTextDown = `Vote ${type.toLowerCase()} down 1`,
            ctrlIDLabel = `vote-label-${ctrlID}`,
            ctrlIDText = `vote-up-down-${ctrlID}`,
            ctnrClasses = classnames({
                [`vote-ctrl`]: true,
                [`align-right`]: align === "align-right",
                [`align-left`]: align === "align-left",
                [`l2r`]: layout === "l2r",
                [`t2b`]: layout === "t2b",
                [`size-${size}`]: (size.length > 0)
            });

        return (
            <Row className={ctnrClasses}>
                <button
                    onClick={this.handleUpVote}
                    className="button-icon button-vote-up"
                    title={titleUp}
                    type="button"
                    aria-controls={ctrlIDText}
                >
                    <ThumbsUpIcon className="icon icon-thumbs-up" />
                    <span className="show-for-sr">{buttonSRTextUp}</span>
                </button>
                <button
                    onClick={this.handleDownVote}
                    className="button-icon button-vote-down"
                    title={titleDown}
                    type="button"
                    aria-controls={ctrlIDText}
                >
                    <ThumbsDownIcon className="icon icon-thumbs-down" />
                    <span className="show-for-sr">{buttonSRTextDown}</span>
                </button>
                <strong
                    id={ctrlIDLabel}
                    className="vote-score-label show-for-sr"
                >Post Score:</strong>
                <span
                    id={ctrlIDText}
                    className="vote-score"
                    aria-labelledby={ctrlIDLabel}
                >{score.toString()}</span>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteComment: (body) => apiFetch({action: "comment", type: "vote", body})
            .then((res) => dispatch(voteComment(body))),
        votePost: (body) => apiFetch({action: "post", type: "vote", body})
            .then((res) => dispatch(votePost(body)))
    };
}

export default connect(null, mapDispatchToProps)(VoteUpDown);
