// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';
import PlusIcon from 'react-icons/lib/fa/plus-circle';


class AppNav extends Component {

    static defaultProps = {
        links: [
            {
                name: 'bitcoin',
                path: '/posts/btc',
                ticker: 'btc'
            },
            {
                name: 'ethereum',
                path: '/posts/eth',
                ticker: 'eth'
            },
            {
                name: 'litecoin',
                path: '/posts/ltc',
                ticker: 'ltc'
            },
            {
                name: 'ripple',
                path: '/posts/xrp',
                ticker: 'xrp'
            }
        ]
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
                    {links.map((link) => (
                        <li key={`nav-${(link.ticker || link.name)}`} className={`nav-${(link.ticker || link.name)}`}>
                            <Link to={link.path} title={`${link.name} Posts`}>
                                <i className="icon"></i>
                                <span className="text show-for-sr">{`${link.name}`}</span>
                            </Link>
                        </li>
                    ))}
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