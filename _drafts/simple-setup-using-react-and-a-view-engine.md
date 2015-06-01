---
layout: posts
title: Simple setup using react and a view engine
tags: []
published: true
category: 
description: 
img: 
sitename: 
showcommentcount: False
comments: false
projectdate: 
theurl: 
url: 
date: 2015-06-01
alt: 
postid: 

---

app.js
~~~~ javascript
'use strict'
var express = require('express')
var app = require('../lib/index.js')
var fs = require('fs')
var path = require('path')
var xml2js = require('xml2js')
var server = express()
var parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true
})
var debug = require('debug')("react-accessible-forms:app")
server.use(express.static(__dirname + '/public'));
server.set('views', __dirname + '/views');
server.set('view engine', 'jsx');
server.engine('jsx', require('express-react-views').createEngine({ beautify: true }));


server.get("/", function(req, res) {
	var json = require(__dirname + '/swagger.json')
	console.log(json)
	res.render('index', json)
});

server.listen(2000)
console.log("Server is listening")
debug("Server is listening")
~~~~

index.jsx
~~~~ jsx
var React = require('react');
var DefaultLayout = require('./layout');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.swagger}>
        <div>Hello {this.props}</div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
~~~~

layout.jsx
~~~~ jsx
var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
        	<title>{this.props.title}</title>
        	<script src="/bundle.js"></script>
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
~~~~

package.json
~~~~ bash
{
  "name": "react-accessible-form",
  "version": "0.0.1",
  "description": "Accessible React forms with validation using json schema",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "gulp --harmony",
    "prod": "nodemon --harmony ./examples/app.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/melxx001/react-accessible-form.git"
  },
  "keywords": [
    "react",
    "reactjs",
    "forms",
    "react-form",
    "react-forms",
    "accessible",
    "json",
    "schema"
  ],
  "author": "Hicham El Hammouchi <hicham.elhammouchi@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/melxx001/react-accessible-form/issues"
  },
  "homepage": "https://github.com/melxx001/react-accessible-form",
  "dependencies": {
    "debug": "^2.2.0",
    "generate-schema": "^2.1.1",
    "react": "^0.13.3",
    "react-bootstrap": "^0.23.0",
    "swagger-tools": "^0.8.7",
    "xml2js": "^0.4.8"
  },
  "devDependencies": {
    "browserify": "^10.2.3",
    "express": "^4.12.4",
    "express-react-views": "^0.8.1",
    "gulp": "^3.8.11",
    "gulp-babel": "^5.1.0",
    "gulp-clean": "^0.3.1",
    "gulp-nodemon": "^2.0.3",
    "gulp-react": "^3.0.1",
    "gulp-reactify": "^3.0.1",
    "gulp-webpack": "^1.4.0",
    "run-sequence": "^1.1.0",
    "vinyl-source-stream": "^1.1.0"
  }
}

~~~~