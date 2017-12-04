// libs
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// app
import '../css/app.css';
import PostList from './PostList';
import SortBy from './SortBy';
import FilterBy from './FilterBy';
import Row from './GridRow';
import Col from './GridColumn';
import {setCategoryTitle} from '../utils/helpers';
// app: actions
import {setCategory} from '../actions/categories';
import {setPageTitle} from '../actions/meta';


class PageHome extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired,
        match: PropTypes.object.isRequired
    }

    static defaultProps = {

        category: "all",
        categories: {},
        posts: {},
        match: { params: undefined }
    }

    componentDidMount() {
        const {match, category, setCategory} = this.props;

        // required for setting initial navigation and settings
        (!_.isUndefined(match.params) && !_.isUndefined(match.params.category))
            ? setCategory(match.params.category) : setCategory(category);
    }

    shouldComponentUpdate(nextProps, next) {
        const {category, meta} = this.props,
            {page: curPage} = meta.title,
            {page: nextPage} = nextProps.meta.title;
        return curPage !== nextPage || (nextProps.match.params && nextProps.match.params.category !== category);
    }

    componentWillReceiveProps(nextProps) {
        const {meta, setPageTitle} = this.props,
            {page: curPage} = meta.title,
            {category: nextCategory, categories: nextCategories} = nextProps;
        let nextPage = setCategoryTitle(nextCategories, nextCategory);

        if (curPage !== nextPage) { setPageTitle({ page: nextPage }); }
    }

    render() {
        const {category, categories} = this.props;
        let hdrTitle = setCategoryTitle(categories, category);

        return (
            <main className="app-content" role="main">
                <header>
                    <Row>
                        <Col width={{sm:12}}><h1>{hdrTitle}</h1></Col>
                        <Col width={{sm:12, md:6, lg:7}} className="hdr-filter"><FilterBy /></Col>
                        <Col width={{sm:12, md:6, lg:5}} className="hdr-sort"><SortBy /></Col>
                    </Row>
                </header>
                <PostList />
            </main>
        );
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories,
        category: state.category,
        meta: state.meta
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategory: (category) => dispatch(setCategory(category)),
        setPageTitle: (title) => dispatch(setPageTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
