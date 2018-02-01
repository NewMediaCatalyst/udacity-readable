// deps
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// app
import {
    setSortMethod,
    sortPostsVoteScoreAsc, sortPostsVoteScoreDesc,
    sortPostsPubDateAsc, sortPostsPubDateDesc
} from '../actions/posts';
import '../css/comp.sortby.css';


class SortBy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortMethod: this.props.posts.sortMethod
        }
    }

    static propTypes = {
        posts: PropTypes.object.isRequired
    }

    static defaultProps = {
        sortOpts: [
            {
                name: "Votes, hi to low",
                value: "voteScoreDesc"
            },
            {
                name: "Votes, low to hi",
                value: "voteScoreAsc"
            },
            {
                name: "Published, new to old",
                value: "pubDesc"
            },
            {
                name: "Published, old to new",
                value: "pubAsc"
            }
        ],
        posts: {
            all: {},
            default: {},
            sortMethod: "voteScoreDesc"
        }
    }


    handleChange(e) {
        let value = e.target.value;
        const {
            posts, setSortMethod, sortPostsVoteAsc, sortPostsVoteDesc, sortPostsPubdateAsc, sortPostsPubdateDesc
        } = this.props;

        setSortMethod(value);
        this.setState({ sortMethod: value });

        switch (value) {
            case "voteScoreAsc": return sortPostsVoteAsc(posts);
            case "voteScoreDesc": return sortPostsVoteDesc(posts);
            case "pubAsc": return sortPostsPubdateAsc(posts);
            case "pubDesc": return sortPostsPubdateDesc(posts);
            default: console.log("Hmm, SortBy has unexpected value"); return;
        }
    }

    render() {
        const {sortOpts} = this.props;
        let {sortMethod} = this.state;

        return (
            <div className="sort-by">
                <label htmlFor="sort-posts-by">Sort by:</label>
                <select
                    id="sort-posts-by"
                    onChange={(ev) => this.handleChange(ev)}
                    value={sortMethod}
                >
                    {sortOpts.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        sortBy: state.sortMethod
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSortMethod: (sortMethod) => dispatch(setSortMethod(sortMethod)),
        sortPostsVoteAsc: (posts) => dispatch(sortPostsVoteScoreAsc(posts)),
        sortPostsVoteDesc: (posts) => dispatch(sortPostsVoteScoreDesc(posts)),
        sortPostsPubdateAsc: (posts) => dispatch(sortPostsPubDateAsc(posts)),
        sortPostsPubdateDesc: (posts) => dispatch(sortPostsPubDateDesc(posts))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
