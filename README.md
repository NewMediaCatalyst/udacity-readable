# Token Talk <small>(a Readable Project)</small>

**Meet *Token Talk*,** my project for the 'Readable' project for Udacity's React Nanodegree course,
which covers ES6, React and Redux. Token Talk is a news or blog posting site with a crypto currency
focus (Bitcoin, Ethereum, Ripple, more) where you can: view, create, edit and delete posts and comments,
as well as, vote on posts and comments up or down. All of the pre-populated posts, comments, and categories
are sample data which are provided by the simple API server and the post's titles are pre-populated from a
few titles found on [CoinDesk.com](https://www.coindesk.com/).

**Please note,** the project's UI and API server take a very trusting view of the web, as anyone(!)
can post, edit or delete or up/down vote posts and comments. This code is intended as a learning project for
the Nanodegree, *and not intended as a production-ready project*.

## To Install, Setup and View Token Talk
1. Git clone my 'udacity-readable' project from [my GitHub landing page](https://github.com/NewMediaCatalyst)
    * `git clone https://github.com/NewMediaCatalyst/udacity-readable.git <cloned-project-name>`
1. Open **two separate** command-line prompts
1. First, at command prompt #1: (runs api-server)
    * `cd <cloned-project-name>/api-server`
    * `npm install`
    * `npm start`
1. Second, at command prompt #2: (runs frontend)
    * `cd <cloned-project-name>/frontend`
    * `npm install`
    * `npm start`
    * After a short pause, your browser should automically open
        * or you can click this link to [load http://localhost:3000](http://localhost:3000)

## Project Sections

* (a) **the API server** found in the '/api-server/' folder
    * has <u>only minor edits made by me</u>,
    * the rest of the code was cloned from the [API server starter project](https://github.com/udacity/reactnd-project-readable-starter) found on GitHub

* (b) **the web UI or front end user interface** is found in the '/frontend/' folder
    * <u>This is the frontend user interface code that I wrote to complete the project</u>
    * I utilized the ['create-react-app'](https://github.com/facebookincubator/create-react-app) to provide the starting point for the 'frontend' project

## Project Dependencies:
* The code in this repo (the API server, and frontend code described above)
* The NPM packages which are installed by running 'npm install' as described below in the 'To install' section
* No additional external dependencies are utilized

## Project Functionality:
* View, create, edit, delete, user sort and user filter the site's posts (by vote and comment count)
* View, create, edit, delete and system sort (by vote count) the site's comments
* View categories (used for navigation)
* Page title updates appropriately
* Pages adjust to screen size (mobile-first, responsive)

## Known Issues:
* No known issues

## Attribution
* I did utilize some CSS gradients (as box-shadow) from an online example for the outer page wrapper, .app-content
    * My computer crashed in the middle of this project, so I was unable to find the original URL to properly give proper credit to the author here.
    * These box-shadow are visible in /frontend/src/css/ in app.css at .app-content, .app-content:before and .app-content:after

## API Server

* **NOTE:**
    * Minor edits were made to the [base API server provided by Udacity](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/) in order to setup my project
    * You will need to run the edited API server provided with this project, in order for the Token Talk project to run correctly
* Details regarding the base API server, provided by Udacity, can be found in its [README file](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md) from the project's own Github repo.
