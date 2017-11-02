// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeIcon from 'react-icons/lib/fa/home';
import PlusIcon from 'react-icons/lib/fa/plus-circle';

// app: styles
import '../css/app.nav.css';

class AppNav extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired
    }
    static defaultProps = { // TODO pull categories from API
        links: []
    }

    render() {
        let {links} = this.props;

        return ( // eslint-disable-next-line
            <nav className="app-nav" role="navigation">
                <ul>
                    <li className="nav-home">
                        <Link to={"/"} title="Home">
                            <HomeIcon className="icon" />
                            <span className="text show-for-sr">Home</span>
                        </Link>
                    </li>
                    {(links.length > 0) && links.map((link) => {
                        return <li key={`nav-${(link.ticker || link.name)}`} className={`nav-${(link.ticker || link.name)}`}>
                            <Link to={`/posts/${link.path}`} title={`${link.name} Posts`}>
                                <i className="icon"></i>
                                <span className="text show-for-sr">{`${link.name}`}</span>
                            </Link>
                        </li>
                    })}
                    <li className="nav-create-post">
                        <Link to={"/post/create"} title="Create New Post">
                            <PlusIcon className="icon" />
                            <span className="text show-for-sr">Create New Post</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default AppNav;