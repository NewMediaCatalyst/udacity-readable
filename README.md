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

## To Install, Setup and View Token Talk
* Git clone my 'udacity-readable' project from [my GitHub landing page](https://github.com/NewMediaCatalyst)
* Then from **two separate** command-line prompts
* First, at command prompt #1: (runs api-server)
    * `cd <cloned-project-name>/api-server`
    * `npm install`
    * `node server`
* Second, at command prompt #2: (runs frontend)
    * `cd <cloned-project-name>/frontend`
    * `npm install`
    * `npm start`
    * Your browser should automically open
        * or you can click this link to [load http://localhost:3000](http://localhost:3000)

## Known Issues (work-in-progress):
* After submitting an edit to a comment, clicking the link to navigate back to the post causes an error
    * the edit occurs correctly (visible by clicking logo), however navigation back to the correct URL is what's breaking
* Intermittently, navigating using the 'View New Post' link on a newly created post will fail to render the new content
    * refreshing the page will show the correct content
    * Alternately, click the link to 'View post in listing'

## Attribution
* I did utilize some CSS gradients (as box-shadow) from an online example for the outer page wrapper, .app-content
    * My computer crashed in the middle of this project, so I was unable to find the original URL to properly give proper credit to the author here.
    * These box-shadow are visible in /frontend/src/css/ in app.css at .app-content, .app-content:before and .app-content:after

## API Server

* **NOTE:**
    * Minor edits were made to the [base API server provided by Udacity](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/) in order to setup my project
    * You will need to run the edited API server provided with this project, in order for the Token Talk project to run correctly
* Details regarding the base API server, provided by Udacity, can be found in its [README file](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md) from the project's own Github repo.
