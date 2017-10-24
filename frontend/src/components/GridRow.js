// deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Row extends Component {

    static propTypes = {
        dir: PropTypes.string.isRequired,
        padding: PropTypes.bool.isRequired,
        margin: PropTypes.bool.isRequired
    }

    static defaultProps = {
        dir: "x",
        padding: false,
        margin: false
    }

    render() {
        let {dir, padding, margin, children, className} = this.props,
            classes = classnames({
                [`grid-${dir}`]: true,
                [`grid-margin-${dir}`]: margin,
                [`grid-padding-${dir}`]: padding,
                [`${className}`]: className
            });

        return (
            <div className={classes} children={children} />
        );
    }
}

export default Row;
