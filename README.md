# Readable API Server

This is my Readable project called *Token Talk* for Udacity's React Nanodegree course
(which includes Redux) which is a news or blog posting site with a crypto currency
focus (Bitcoin, Ethereum, Litecoin, Ripple, etc).  All of the starting posts, comments,
and categories are sample data which are received from the simple API server. The post title's
are based on a small subset of titles found on [CoinDesk.com](https://www.coindesk.com/).

Please note, the project and server take a very trusting view of the web, as anyone(!) can post, edit
or delete posts and comments. This code is intended as a learning project for the Nanodegree,
and not(!) a production-ready project.

The project has two underlying components or project within the main folder:

* (a) **the API server** found in the '/api-server/' folder, has only minor edits made to the cloned
[API server starter project found on GitHub](https://github.com/udacity/reactnd-project-readable-starter))

* (b) **the web UI or front end** found in the '/frontend/' folder, was the part that I created for this project assignment. I utilized
the ['create-react-app'](https://github.com/facebookincubator/create-react-app) to start
the 'frontend' project, but it was heavily edited.


## Project functionality:
* View, create, edit, delete, user sort and user filter posts (by vote and comment count)
* View, create, edit, delete and system sort (by vote count) comments
* View categories (used for navigation)
* Page title updates appropriately
* Pages adjust to screen size (mobile-first, responsive)

## Install, setup and View the project
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


## API Server

Information about the API server and how to use it can be found in its [README file](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md).
