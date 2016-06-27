---
layout: post
postid: 2016-06-26-universal-react-redux-typescript
published: true
comments: false
showcommentcount: false
date: 2016-06-26
# img: universal-react-redux-typescript.png
alt: Universal React Redux with Typescript
projectdate: June 2016
sitename: Universal React Redux with Typescript
theurl: 
category: Development
description: Universal JS Apps Example with React, Redux and Typescript
title: Universal React and Redux
tags : [React, Redux, Universal, Isomorphic, Typescript]
---

This is an example to help me put together a Universal JavaScript project using React, Redux and typescript.

## Table of contents

{:toc .postpage-scroll}
+ TOC

## Project Setup

There's a bit of setup needed to get everything working correctly. Most of this setup is really for development.

### Webpack

It is a module bundler which transforms various assets (JavaScript, CSS, and HTML) into a format that's easy to consume by the browser. Click [here](http://webpack.github.io/){:target="_blank"} for documentation about webpack.

Below is an example config transforming typescript to ES5 JavaScript. When we run `$ webpack`, the configuration in webpack.config.js is used to bundle and compile the typescript code.

#### webpack.config.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '_build'),
  },

  // Enable source maps for debugging webpack's output.
  devtool: 'source-map',
  debug: !production,
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    root: path.join(__dirname, 'src'),
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],

    preLoaders: [
      // All output '.js' files will have any source maps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

if (production) {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      test: /\.js$/,
    }),
  ];
}

module.exports = config;

~~~


#### webpack.config.dev.js

In development, we want to use webpack-dev-server in order to easily compile, bundle and reload code without having to manually do it.

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config');

config.cache = true;
config.debug = true;
config.devtool = 'inline-source-map';

// This will compile and reload code changes
config.entry.index.unshift('webpack-dev-server/client?http://localhost:8080/');

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

config.devServer = {
  hot: true,
  inline: true,
};

module.exports = config;

~~~


### Typescript

Typescript will be used in this starter project.

~~~ bash
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": true,
    "removeComments": true,
    "sourceMap": true,
    "outDir": "_tsc",
    "jsx": "react"

  },
  "exclude": [
    "node_modules",
    "_build",
    "typings/index",
    "typings/index.d.ts"
  ]
}
~~~

Check out the Typescript [documentation](http://www.typescriptlang.org/docs/tutorial.html){:target="_blank"} and [configuration](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html){:target="_blank"}.

### Testing

### Coverage

### Tslint

### Eslint


## React

## Redux

## Typescript

