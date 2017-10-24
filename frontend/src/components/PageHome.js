// libs
import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

// app
import '../css/app.css';
import Row from './GridRow';
import Col from './GridColumn';

class PageHome extends Component {

    render() {
        return (
            <main className="app-content" role="main">
                <Row>
                    <Col width={{sm:12,lg:9}} className="app-intro">
                        <p>To get started, edit <code>src/App.js</code> and save to reload.</p>
                    </Col>
                </Row>
            </main>
        );
    }
}

export default PageHome;
