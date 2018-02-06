// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HomeIcon from 'react-icons/lib/fa/home';
import PlusIcon from 'react-icons/lib/fa/plus-circle';

// app
import {setCategory} from '../actions/categories';
// app: styles
import '../css/app.nav.css';


class AppNav extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired
    }

    static defaultProps = {
        links: []
    }

    handleClick(ev) {
        const {setCategory, category} = this.props;
        let filter = ev.target.getAttribute('filter');

        if (filter !== category) { setCategory(filter); }
    }

    render() {
        let {links, category} = this.props;

        return ( // eslint-disable-next-line
            <nav className="app-nav" role="navigation">
                <ul>
                    <li className="nav-home">
                        <Link
                            to={"/"}
                            className={(category === "all") ? "selected": null}
                            onClick={(ev) => this.handleClick(ev)}
                            filter="all"
                            title="Home"
                        >
                            <HomeIcon className="icon" />
                            <span className="text show-for-sr">Home</span>
                        </Link>
                    </li>
                    {(links.length > 0) && links.map((link) => {
                        const {ticker, name, path, slug} = link;
                        return <li key={`nav-${slug}`} className={`nav-${slug}`}>
                            <Link
                                className={(category === ticker) ? "selected": null}
                                to={path}
                                onClick={(ev) => this.handleClick(ev)}
                                filter={ticker}
                                title={`${name} Posts`}
                            >
                                <i className="icon"></i>
                                <span className="text show-for-sr">{`${name}`}</span>
                            </Link>
                        </li>
                    })}
                    <li className="nav-create-post">
                        <Link
                            className={(category === "create") ? "selected": null}
                            to={"/post/create"}
                            onClick={(ev) => this.handleClick(ev)}
                            filter="create"
                            title="Create New Post"
                        >
                            <PlusIcon className="icon" />
                            <span className="text show-for-sr">Create New Post</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        category: state.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategory: (category) => dispatch(setCategory(category))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav);