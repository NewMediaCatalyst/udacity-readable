import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class SortBy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOpts: this.props.sortMethod
        }
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        sortMethod: PropTypes.string.isRequired
    }

    static defaultProps = {
        sortMethod: "voteScoreDesc",
        sortOpts: [
            {
                name: "Vote score, descending",
                value: "voteScoreDesc"
            },
            {
                name: "Vote score, ascending",
                value: "voteScoreAsc"
            },
            {
                name: "Publish time, descending",
                value: "pubDesc"
            },
            {
                name: "Publish time, ascending",
                value: "pubAsc"
            }
        ],
        posts: {}
    }


    onChange(e) {
        console.log("e: ", e);
        this.setState({ sortMethod: e.target.value });
    }


    render() {
        const {sortOpts} = this.props;
        let {sortMethod} = this.state;

        return (
            <div className="sort-by">
                <label htmlFor="sort-posts-by">Sort by:</label>
                <select id="sort-posts-by" onChange={this.handleChange} value={sortMethod}>
                {sortOpts.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.name}</option>
                    )
                )}
                </select>
            </div>
        );
    }
}

export default SortBy;
