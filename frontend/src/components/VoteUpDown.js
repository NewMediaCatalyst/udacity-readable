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
        layout: PropTypes.string.isRequired,
        align: PropTypes.string.isRequired
    }

    static defaultProps = {
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
        let {score, layout, align} = this.props,
            {ctrlID} = this.state,
            ctrlIDLabel = `vote-label-${ctrlID}`,
            ctrlIDText = `vote-up-down-${ctrlID}`,
            ctnrClasses = classnames({
                [`vote-ctrl`]: true,
                [`align-right`]: align === "align-right",
                [`align-left`]: align === "align-left",
                [`l2r`]: layout === "l2r",
                [`t2b`]: layout === "t2b"
            })


        return (
            <Row className={ctnrClasses} margin={true}>
                <button
                    onClick={this.handleUpVote}
                    className="button-icon button-vote-up"
                    title="Post +1"
                    type="button"
                    aria-controls={ctrlIDText}
                >
                    <ThumbsUpIcon className="icon icon-thumbs-up" />
                    <span className="show-for-sr">Vote post up +1</span>
                </button>
                <button
                    onClick={this.handleDownVote}
                    className="button-icon button-vote-down"
                    title="Post -1"
                    type="button"
                    aria-controls={ctrlIDText}
                >
                    <ThumbsDownIcon className="icon icon-thumbs-down" />
                    <span className="show-for-sr">Vote post down -1</span>
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
