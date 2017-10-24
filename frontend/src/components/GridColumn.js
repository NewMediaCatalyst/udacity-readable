// deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Col extends Component {

    static propTypes = {
        width: PropTypes.object.isRequired
    }

    static defaultProps = {
        width: {
            sm: 0, md: 0, lg: 0, xl: 0, xxl: 0
        }
    }

    render() {
        let {width, children, className} = this.props,
            {sm, md, lg, xl, xxl} = width,
            classes = classnames({
                [`small-${sm}`]: sm,
                [`medium-${md}`]: md,
                [`large-${lg}`]: lg,
                [`xlarge-${xl}`]: xl,
                [`xxlarge-${xxl}`]: xxl,
                [`cell`]: true,
                [`${className}`]: className
            });

        return (
            <div className={classes} children={children} />
        );
    }
}

export default Col;
