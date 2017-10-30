// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import uuidV4 from 'uuid.v4';
import classnames from 'classnames';

// app
import Row from './GridRow';
// app: styles
import '../css/comp.voteupdown.css';


class VoteUpDown extends Component {

    static propTypes = {
        score: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        layout: PropTypes.string.isRequired,
        align: PropTypes.string.isRequired
    }

    static defaultProps = {
        score: 0,
        size: "",
        type: "Post",
        layout: "l2r",
        align: "align-right"
    }

    state = {
        ctrlID: uuidV4().slice(0,8),
        score: this.props.score
    }

    handleUpVote(e) {
        e.preventDefault(); e.stopPropagation();
        let {score} = this.state;
        this.setState({ score: Number(score) + 1 });  // TODO: fix this
    }

    handleDownVote(e) {
        e.preventDefault(); e.stopPropagation();
        let {score} = this.state;
        this.setState({ score: Number(score) - 1 });  // TODO: fix this
    }

    render() {
        let {score, size, type, layout, align} = this.props,
            {ctrlID} = this.state,
            titleUp = `${type} +1`,
            titleDown = `${type} -1`,
            buttonSRTextUp = `Vote ${type.toLowerCase()} up +1`,
            buttonSRTextDown = `Vote ${type.toLowerCase()} down -1`,
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
                >{Number(score)}</span>
            </Row>
        );
    }
}

export default VoteUpDown;
