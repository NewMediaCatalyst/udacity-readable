// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


class DateTime extends Component {

    static propTypes = {
        date: PropTypes.string.isRequired
    }

    render() {
        let {date} = this.props,
            dateText = `${moment(date).format("MMM DD YYYY")},`,
            timeText = moment(date).format("HH:mm A");

        return (
            <time dateTime={date} className="text date-time">
                <span className="text-date">{dateText}</span>
                <span className="text-time">{timeText}</span>
            </time>
        );
    }
}

export default DateTime;
