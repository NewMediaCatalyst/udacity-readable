// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// app
import {setCategory} from '../actions/categories';
import {showAllPosts, filterPostsByCat, setSortMethod} from '../actions/posts';
import {capitalize} from '../utils/helpers';
// app: styles
import '../css/comp.filterby.css';


class FilterBy extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired,
        categories: PropTypes.object.isRequired
    }

    static defaultProps = {
        sortMethod: "voteScoreDesc",
        base: {
            name: 'All',
            path: '/posts/',
            slug: 'all'
        },
        category: 'all',
        categories: []
    }

    handleClick(ev) {
        const {setCategory, setSortMethod, sortMethod, category} = this.props;
        let filter = ev.target.getAttribute('filter');
        if (filter !== category) { setCategory(filter); }
        if (filter === "all") { setSortMethod(sortMethod); }
    }

    render() {
        const {categories, base, category} = this.props;
        let links = categories.categories,
            baseLinkClasses = classnames({
                'filter-link': true,
                'active': (category === base.slug ? 'active' : null)
            })

        return ( // eslint-disable-next-line
            <nav className="filter-by" role="navigation">
                <p className="filter-label"><strong>Filter by:</strong></p>
                <ul className="filter-links">
                    <li className={`filter-item fl-${base.slug}`}>
                        <Link
                            to={base.path}
                            className={baseLinkClasses}
                            onClick={(ev) => this.handleClick(ev)}
                            filter={base.slug}
                            title="Remove filters. Show all posts"
                        >{base.name}</Link>
                    </li>
                    {(links !== undefined && links.length > 0) && links.map((link) => {
                        const {ticker, name, path, slug} = link;
                        let linkClasses = classnames({
                            'filter-link': true,
                            'active': (category === slug ? 'active' : null)
                        })
                        return <li key={`fl-${slug}`} className="filter-item">
                            <Link
                                to={path}
                                className={linkClasses}
                                onClick={(ev) => this.handleClick(ev)}
                                filter={ticker}
                                title={`Filter by ${capitalize(name)}`}
                            >{`${ticker.toUpperCase()}`}</Link>
                        </li>
                    })}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        category: state.category,
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSortMethod: (sortMethod) => dispatch(setSortMethod(sortMethod)),
        setCategory: (category) => dispatch(setCategory(category)),
        showAllPosts: (category) => dispatch(showAllPosts(category)),
        filterPostsByCat: (category) => dispatch(filterPostsByCat(category))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBy);