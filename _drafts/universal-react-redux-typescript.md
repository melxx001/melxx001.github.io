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

There's a bit of setup needed to get everything working correctly. Most of this setup is really for development. 

The code is available [here](https://github.com/melxx001/redux-starter){:target="_blank"}. There are sequential branches showing the iterations I went through to reach the final version.

## 1. Adding React, Typescript and Webpack

### Typescript

> To get familiar with typescript, check out the [documentation](http://www.typescriptlang.org/docs/tutorial.html){:target="_blank"} and [configuration setup](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html){:target="_blank"}. The Typescript definition manager documentation can be found [here](https://github.com/typings/typings){:target="_blank"}.

Let's install the development dependencies modules:

~~~ bash
$ npm install --save-dev typescript typings tslint
~~~

> Once installed, you'll see `tsc`, `typings` and `tslint` among others in the `node_modules/.bin` directory. It's an easier way to reference them to compile, install typings and lint our project. 
>
> For example, we can run `node_modules/.bin/tslint src/**/*.ts{,x}` to lint the project.

Add a `tsconfig.json` in the root directory with the configuration below:
{: .padding-top}

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

Since webpack will be used to compile and bundle the code, The `tsconfig.json` above will be used by the IDE and also to compile all the code into to a folder `_tsc` in order to run coverage. See the coverage section below.

### React

### Webpack

It is a module bundler which transforms various assets (JavaScript, CSS, and HTML) into a format that's easy to consume by the browser. Click [here](http://webpack.github.io/){:target="_blank"} for documentation about webpack.

Below is an example config transforming typescript to ES5 JavaScript. When we run `webpack` in a terminal, the configuration in `webpack.config.js` is used to bundle and compile the typescript code.

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

### Testing

I decided to use the [Tape](https://github.com/substack/tape){:target="_blank"} test module after reading [Why I use Tape Instead of Mocha & So Should You](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.mo56gj6jk){:target="_blank"} by Eric Elliot.

You name my tests `<name>.test.ts` and save the file in the same folder of the file I'm testing.

For example, tests for utils.ts are in utils.test.ts

~~~ bash
|-- src
  |-- utils.ts
  |-- utils.test.ts
|-- server.ts
|-- server.test.ts
~~~

#### Hello.tsx

~~~ javascript
import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>This page uses {this.props.compiler} and {this.props.framework}!</h1>;
  }
}
~~~

#### Hello.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';
import { createRenderer } from 'react-addons-test-utils';

import { Hello } from './Hello';

test('test', (t: test.Test) : void => {
  t.equal(typeof Hello, 'function', 'Check if Hello is a function');

  const compiler = 'TypeScript';
  const framework = 'React';

  const test = <Hello compiler={compiler} framework={framework} />;
  t.deepEqual(test.props, { compiler: compiler, framework: framework }, 'Check is Hello returns correctly');

  const renderer = createRenderer();
  renderer.render(<Hello compiler={compiler} framework={framework} />);
  const result = renderer.getRenderOutput();
  t.equal(result.type, 'h1', 'Check Hello returns h1');

  t.end();
});

~~~

### Coverage

I've yet to find a coverage tool that can easily be used with Typescript. Also, I wanted to minimize the amount of packages to use to get coverage. I eventualy decided to continue use [istanbul](https://github.com/gotwarlost/istanbul){:target="_blank"}.

The twist is that I compile Typescript to ES6 code (check out tsconfig.json above) because compiling to ES5 adds various items which reduces coverage. I then run coverage on the compiled code.

Running `npm run coverage` in a terminal will create a `coverage` folder with an `index.html` which will show the coverage data.

### Linting

I use [TSLint](https://palantir.github.io/tslint/){:target="_blank"} to check the Typescript files in the project and [ESLint](http://eslint.org/){:target="_blank"} to lint to regular JavaScript files.

You can run `npm run lint` in a terminal to lint the code.


