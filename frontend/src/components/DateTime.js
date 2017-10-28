// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// app
import '../css/comp.datetime.css';


class DateTime extends Component {

    static propTypes = {
        display: PropTypes.string.isRequired, // options: all, time, date
        date: PropTypes.string.isRequired,    // machine readable date
        sep: PropTypes.string.isRequired,
        timeFormat: PropTypes.string.isRequired,
        dateFormat: PropTypes.string.isRequired
    }

    static defaultProps = {
        date: "",
        sep: ",",
        timeFormat: "HH:mm A",
        dateFormat: "MMM DD YYYY",
        display: "all"
    }

    renderDateTime() {
        let {date, timeFormat, dateFormat, sep} = this.props,
            dateText = moment(date).format(dateFormat),
            timeText = moment(date).format(timeFormat);

        return (
            <time dateTime={date} className="text date-time">
                <span className="text-date">{dateText}</span>
                {sep ? <span className="text-sep">{sep}</span> : null }
                <span className="text-time">{timeText}</span>
            </time>
        );
    }

    renderDate() {
        let {date, dateFormat} = this.props,
            dateText = moment(date).format(dateFormat);

        return (
            <time dateTime={date} className="text date-time">
                <span className="text-date">{dateText}</span>
            </time>
        );
    }

    renderTime() {
        let {date, timeFormat} = this.props,
            timeText = moment(date).format(timeFormat);

        return (
            <time dateTime={date} className="text date-time">
                <span className="text-time">{timeText}</span>
            </time>
        );
    }

    render() {
        let {display} = this.props;

        switch (display) {
            case "all":  return this.renderDateTime();
            case "date": return this.renderDate();
            case "time": return this.renderTime();
            default: return <p>No date</p>
        }

    }
}

export default DateTime;
