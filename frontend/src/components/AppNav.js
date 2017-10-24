// deps
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';


class AppNav extends Component {

    static defaultProps = {
        links: [
            {
                name: 'bitcoin',
                path: '/category/btc',
                ticker: 'btc'
            },
            {
                name: 'ethereum',
                path: '/category/eth',
                ticker: 'eth'
            },
            {
                name: 'litecoin',
                path: '/category/ltc',
                ticker: 'ltc'
            },
            {
                name: 'ripple',
                path: '/category/xrp',
                ticker: 'xrp'
            }
        ]
    }

    render() {
        let {links} = this.props;

        return (
            <nav className="app-nav" role="navigation">
                <ul>
                    <li className="nav-home">
                        <Link to={"/"}><HomeIcon className="icon" /><span className="text show-for-sr">Home</span></Link>
                    </li>
                    {links.map((link) => (
                        <li className={`nav-${(link.ticker || link.name)}`}>
                            <Link to={link.path}><i title={link.name} className="icon"></i><span className="text show-for-sr">{`${link.name}`}</span></Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default AppNav;