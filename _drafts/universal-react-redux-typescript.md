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

This is an example to help me put together a Universal JavaScript example using React, Redux and Typescript.

## Table of contents

{:toc .postpage-scroll}
+ TOC

I found it overwhelming to look at fully built examples and realized that the only way to really learn this cool stuff is to build it myself incrementally and write about it. Also, I like to know what every piece of my project is doing and why it's there.

There's a bit of setup needed to get everything working correctly. Most of this setup is for development. For production, you'd really care about the built code which you would deploy.

Throughout this post, I'll be using ES6. If you're not familiar with it, check out my [post](/development/2015/10/01/learning-es6/){:target="_blank"} about it.

The code is available [here](https://github.com/melxx001/redux-starter){:target="_blank"}. There are sequential branches showing the iterations I went through to reach the final version.

## 1. Adding React, Typescript, Linting and Webpack

### Create a new project

The IDE you use doesn't matter. Some people prefer Sublime which I use a lot but for development I found myself drawn to IntelliJ IDEA. While a resource beast, I love using it. 

If you're using Windows, you might run into issues. Please use the [Contact Me](/#contact){:target="_blank"} form and I'll do my best to help you.

If you haven't already, you'll need to install [Node.js](https://nodejs.org/en/){:target="_blank"} which will give node and npm. You'll also need [git](https://git-scm.com/){:target="_blank"} if you want to clone projects from github.

Once Node is available, create a directory and initialize the project:

~~~ bash
$ npm init
~~~ 

You'll get a series of prompts which will create a `package.json` in your root directory.

I would also add [EditorConfig](http://editorconfig.org/){:target="_blank"} to define and maintain consistent coding styles between different editors and IDEs.

Add a `.editorconfig` in the root directory with the configuration below:
{: .padding-top}

~~~ bash
root = true

[*]
insert_final_newline = true
charset = utf-8
trim_trailing_whitespace = true
end_of_line = lf
indent_style = space
indent_size = 2
~~~ 

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

#### tsconfig.json
~~~ bash
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
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

Since webpack will be used to compile and bundle the code, The `tsconfig.json` above will mainly be used by the IDE.
{: .padding-top}

### Linting

I use [TSLint](https://palantir.github.io/tslint/){:target="_blank"} to check the Typescript files in the project and [ESLint](http://eslint.org/){:target="_blank"} to lint to regular JavaScript files.

Add a `tslint.json` in the root directory with the configuration below:

#### tslint.json
~~~ bash
{
  "rules": {
    "class-name": true,
    "comment-format": [true, "check-space"],
    "curly": true,
    "eofline": true,
    "forin": true,
    "indent": [true, "spaces"],
    "label-position": true,
    "label-undefined": true,
    "max-line-length": [true, 120],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [true,
      "log",
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-key": true,
    "no-duplicate-variable": true,
    "no-empty": false,
    "no-eval": true,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-switch-case-fall-through": true,
    "trailing-comma": true,
    "no-trailing-whitespace": false,
    "no-unused-expression": true,
    "no-unused-variable": false,
    "no-unreachable": true,
    "no-use-before-declare": false,
    "no-var-keyword": true,
    "one-line": [true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "radix": true,
    "semicolon": true,
    "triple-equals": [true, "allow-null-check"],
    "use-strict": true,
    "variable-name": "allow-leading-underscore",
    "whitespace": [true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "quotemark": [ true, "single", "jsx-double" ]
  }
}
~~~

I also usually add eslint for any regular js file that I might have within the project.
{: .padding-top}

~~~ bash
$ npm install --save-dev eslint eslint-plugin-react
~~~

Add a `.eslintrc` and a `.eslintignore` in the root directory with the configurations below:
{: .padding-top}

#### .eslintrc
~~~ bash
{
  "env": {                           // http://eslint.org/docs/user-guide/configuring.html#specifying-environments
    "browser": true,                 // browser global variables
    "node": true,                   // Node.js global variables and Node.js-specific rules
    "es6": true,
    "commonjs": true,
    "mongo": true,
    "amd": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "extends": ["eslint:recommended"],
  "rules": {
    /**
     * Strict mode
     */
    "strict": [2, "safe"],          // http://eslint.org/docs/rules/strict

    /**
     * ES6
     */
    "no-var": 2,                     // http://eslint.org/docs/rules/no-var
    "prefer-const": 2,               // http://eslint.org/docs/rules/prefer-const

    /**
     * Variables
     */
    "no-shadow": 2,                  // http://eslint.org/docs/rules/no-shadow
    "no-shadow-restricted-names": 2, // http://eslint.org/docs/rules/no-shadow-restricted-names
    "no-unused-vars": [2, {          // http://eslint.org/docs/rules/no-unused-vars
      "vars": "all",
      "args": "after-used"
    }],
    "no-use-before-define": [0, "nofunc"],       // http://eslint.org/docs/rules/no-use-before-define

    /**
     * Possible errors
     */
    "comma-dangle": [2, "always-multiline"],    // http://eslint.org/docs/rules/comma-dangle
    "no-cond-assign": [2, "always"], // http://eslint.org/docs/rules/no-cond-assign
    "no-console": 1,                 // http://eslint.org/docs/rules/no-console
    "no-debugger": 1,                // http://eslint.org/docs/rules/no-debugger
    "no-alert": 1,                   // http://eslint.org/docs/rules/no-alert
    "no-constant-condition": 1,      // http://eslint.org/docs/rules/no-constant-condition
    "no-dupe-keys": 2,               // http://eslint.org/docs/rules/no-dupe-keys
    "no-duplicate-case": 2,          // http://eslint.org/docs/rules/no-duplicate-case
    "no-empty": 2,                   // http://eslint.org/docs/rules/no-empty
    "no-ex-assign": 2,               // http://eslint.org/docs/rules/no-ex-assign
    "no-extra-boolean-cast": 0,      // http://eslint.org/docs/rules/no-extra-boolean-cast
    "no-extra-semi": 2,              // http://eslint.org/docs/rules/no-extra-semi
    "no-func-assign": 2,             // http://eslint.org/docs/rules/no-func-assign
    "no-inner-declarations": [2, "both"],  // http://eslint.org/docs/rules/no-inner-declarations
    "no-invalid-regexp": 2,          // http://eslint.org/docs/rules/no-invalid-regexp
    "no-irregular-whitespace": 2,    // http://eslint.org/docs/rules/no-irregular-whitespace
    "no-obj-calls": 2,               // http://eslint.org/docs/rules/no-obj-calls
    "no-sparse-arrays": 2,           // http://eslint.org/docs/rules/no-sparse-arrays
    "no-unreachable": 2,             // http://eslint.org/docs/rules/no-unreachable
    "use-isnan": 2,                  // http://eslint.org/docs/rules/use-isnan
    "block-scoped-var": 0,           // http://eslint.org/docs/rules/block-scoped-var

    /**
     * Best practices
     */
    "consistent-return": 2,          // http://eslint.org/docs/rules/consistent-return
    "curly": [2, "multi-line"],      // http://eslint.org/docs/rules/curly
    "default-case": 2,               // http://eslint.org/docs/rules/default-case
    "dot-notation": [2, {            // http://eslint.org/docs/rules/dot-notation
      "allowKeywords": true
    }],
    "eqeqeq": 2,                     // http://eslint.org/docs/rules/eqeqeq
    "guard-for-in": 0,               // http://eslint.org/docs/rules/guard-for-in
    "no-caller": 2,                  // http://eslint.org/docs/rules/no-caller
    "no-else-return": 2,             // http://eslint.org/docs/rules/no-else-return
    "no-eq-null": 2,                 // http://eslint.org/docs/rules/no-eq-null
    "no-eval": 2,                    // http://eslint.org/docs/rules/no-eval
    "no-extend-native": 2,           // http://eslint.org/docs/rules/no-extend-native
    "no-extra-bind": 2,              // http://eslint.org/docs/rules/no-extra-bind
    "no-fallthrough": 2,             // http://eslint.org/docs/rules/no-fallthrough
    "no-floating-decimal": 2,        // http://eslint.org/docs/rules/no-floating-decimal
    "no-implied-eval": 2,            // http://eslint.org/docs/rules/no-implied-eval
    "no-lone-blocks": 2,             // http://eslint.org/docs/rules/no-lone-blocks
    "no-loop-func": 2,               // http://eslint.org/docs/rules/no-loop-func
    "no-multi-str": 2,               // http://eslint.org/docs/rules/no-multi-str
    "no-native-reassign": 2,         // http://eslint.org/docs/rules/no-native-reassign
    "no-new": 2,                     // http://eslint.org/docs/rules/no-new
    "no-new-func": 2,                // http://eslint.org/docs/rules/no-new-func
    "no-new-wrappers": 2,            // http://eslint.org/docs/rules/no-new-wrappers
    "no-octal": 2,                   // http://eslint.org/docs/rules/no-octal
    "no-octal-escape": 2,            // http://eslint.org/docs/rules/no-octal-escape
    "no-param-reassign": 2,          // http://eslint.org/docs/rules/no-param-reassign
    "no-proto": 2,                   // http://eslint.org/docs/rules/no-proto
    "no-redeclare": 2,               // http://eslint.org/docs/rules/no-redeclare
    "no-return-assign": 2,           // http://eslint.org/docs/rules/no-return-assign
    "no-script-url": 2,              // http://eslint.org/docs/rules/no-script-url
    "no-self-compare": 2,            // http://eslint.org/docs/rules/no-self-compare
    "no-sequences": 2,               // http://eslint.org/docs/rules/no-sequences
    "no-throw-literal": 2,           // http://eslint.org/docs/rules/no-throw-literal
    "no-with": 2,                    // http://eslint.org/docs/rules/no-with
    "radix": 2,                      // http://eslint.org/docs/rules/radix
    "vars-on-top": 2,                // http://eslint.org/docs/rules/vars-on-top
    "wrap-iife": [2, "any"],         // http://eslint.org/docs/rules/wrap-iife
    "yoda": 2,                       // http://eslint.org/docs/rules/yoda

    /**
     * Style
     */
    "indent": [2, 2],                // http://eslint.org/docs/rules/indent
    "brace-style": [2,               // http://eslint.org/docs/rules/brace-style
      "1tbs", {
        "allowSingleLine": true
      }],
    "quotes": [
      2, "single", "avoid-escape"    // http://eslint.org/docs/rules/quotes
    ],
    "camelcase": [2, {               // http://eslint.org/docs/rules/camelcase
      "properties": "never"
    }],
    "comma-spacing": [2, {           // http://eslint.org/docs/rules/comma-spacing
      "before": false,
      "after": true
    }],
    "comma-style": [2, "last"],      // http://eslint.org/docs/rules/comma-style
    "eol-last": 2,                   // http://eslint.org/docs/rules/eol-last
    "func-names": 1,                 // http://eslint.org/docs/rules/func-names
    "key-spacing": [2, {             // http://eslint.org/docs/rules/key-spacing
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": 2,            // http://eslint.org/docs/rules/keyword-spacing
    "max-len": [2, 120],              // http://eslint.org/docs/rules/max-len
    "new-cap": [2, {                 // http://eslint.org/docs/rules/new-cap
      "newIsCap": true,
      "capIsNew": false
    }],
    "no-multiple-empty-lines": [2, { // http://eslint.org/docs/rules/no-multiple-empty-lines
      "max": 2
    }],
    "no-nested-ternary": 2,          // http://eslint.org/docs/rules/no-nested-ternary
    "no-new-object": 2,              // http://eslint.org/docs/rules/no-new-object
    "no-spaced-func": 2,             // http://eslint.org/docs/rules/no-spaced-func
    "no-trailing-spaces": 2,         // http://eslint.org/docs/rules/no-trailing-spaces
    "no-extra-parens": [2, "functions"], // http://eslint.org/docs/rules/no-extra-parens
    "no-underscore-dangle": 0,       // http://eslint.org/docs/rules/no-underscore-dangle
    "no-warning-comments": 0,        // http://eslint.org/docs/rules/no-warning-comments
    "object-curly-spacing": [2, "always"], // http://eslint.org/docs/rules/object-curly-spacing
    "one-var": [2, "never"],         // http://eslint.org/docs/rules/one-var
    "padded-blocks": [2, "never"],   // http://eslint.org/docs/rules/padded-blocks
    "semi": [2, "always"],           // http://eslint.org/docs/rules/semi
    "semi-spacing": [2, {            // http://eslint.org/docs/rules/semi-spacing
      "before": false,
      "after": true
    }],
    "space-before-blocks": 2,        // http://eslint.org/docs/rules/space-before-blocks
    "space-before-function-paren": [2, "never"], // http://eslint.org/docs/rules/space-before-function-paren
    "space-infix-ops": 2,            // http://eslint.org/docs/rules/space-infix-ops
    "spaced-comment": 2,             // http://eslint.org/docs/rules/spaced-comment
    "react/jsx-closing-bracket-location": 2,
    "react/jsx-curly-spacing": 2,
    "react/jsx-indent-props": [2, 2],
    "react/jsx-key": 2,
    "react/jsx-max-props-per-line": [2, {"maximum": 1}],
    "react/jsx-no-duplicate-props": [2, {"ignoreCase": true}],
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 2,
    "react/sort-prop-types": [2, {"ignoreCase": true, "callbacksLast": true}],
    "react/jsx-sort-props": [2, {"ignoreCase": true, "callbacksLast": true}],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/no-multi-comp": 2,
    "react/prefer-es6-class": 2,
    "react/prop-types": 2,
    "react/self-closing-comp": 2,
    "react/jsx-wrap-multilines": 2
  }
}

~~~

#### .eslintignore
~~~ bash
coverage
node_modules
typings
.idea
.git
_build

~~~

### Webpack

`Webpack` is a module bundler which transforms various assets (JavaScript, CSS, and HTML) into a format that's easy to consume by the browser. Click [here](http://webpack.github.io/){:target="_blank"} for documentation about webpack.

Let's install webpack and the dependencies for this project

~~~ bash
$ npm install --save-dev webpack file-loader source-map-loader ts-loader babel-register
~~~

The config below transforms typescript to ES5 JavaScript. When we run `node_modules/.bin/webpack` in a terminal, the configuration in `webpack.config.js` is used to bundle and compile the typescript code.

Add a `webpack.config.js` in the root directory and paste in the contents below.

#### webpack.config.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const path = require('path');
const production = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    index: [
      './src/index.tsx',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '_build'),
    publicPath: 'assets',
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

module.exports = config;

~~~

### React

Next, let's add [React](https://facebook.github.io/react/){:target="_blank"} and a few example pages. If you're not familiar with React, you should get [familiarized](https://facebook.github.io/react/){:target="_blank"} with it before continuing.

~~~ bash
$ npm install --save react react-dom 
~~~

Let's also grab the typescript declaration files for Node.js, React and ReactDOM.
{: .padding-top}

~~~ bash
$ node_modules/.bin/typings install env~node -SG
$ node_modules/.bin/typings install dt~react -SG
$ node_modules/.bin/typings install dt~react-dom -SG
~~~

Running that will produce a `typings.json` with data similar to:
{: .padding-top}

#### typings.json

~~~ bash
{
  "globalDependencies": {
    "node": "registry:env/node#6.0.0+20160723033700",
    "react": "registry:dt/react#0.14.0+20160805125551",
    "react-dom": "registry:dt/react-dom#0.14.0+20160412154040"
  }
}
~~~

Let's add some example react code:

 - Add an `index.html` in the root folder
 - Create a `src` directory in your root and add a file named `index.tsx`
 - Create another directory inside `src` called `components`
   - In `src/components`, add a file called `Hello.tsx` (with a capital H).

The structure would look like:
{: .padding-top}

~~~ bash
|- src
  |- components
    |- Hello.tsx
  |- index.tsx
|- index.html
~~~

Add the following code to each file:
{: .padding-top}

#### index.html
~~~ html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React, Typescript & Webpack</title>
</head>
<body>
<div id="example"></div>

<!-- Dependencies -->
<script src="//fb.me/react-15.1.0.min.js"></script>
<script src="//fb.me/react-dom-15.1.0.min.js"></script>

<!-- Main -->
<script src="assets/index.js"></script>
</body>
</html>
~~~

#### index.tsx
~~~ javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('example')
);

~~~

#### src/components/Hello.tsx
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

### Final touchups

At this point, your root directory should look like:
{: .padding-top}
~~~ bash
|- node_modules
|- src
  |- components
    |- Hello.tsx
  |- index.tsx
|- typings
|- .editorconfig
|- .eslintignore
|- .eslintrc
|- index.html
|- package.json
|- tsconfig.json
|- tslint.json
|- typings.json
|- webpack.config.js
~~~

If you selected the default entries when initializing you project with `npm init`, your `package.json` should look something like:
{: .padding-top}
~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "eslint": "^3.3.0",
    "eslint-plugin-react": "^6.0.0",
    "file-loader": "^0.9.0",
    "source-map-loader": "^0.1.5",
    "ts-loader": "^0.8.2",
    "tslint": "^3.14.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.2",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "react": "^15.3.0",
    "react-dom": "^15.3.0"
  }
}

~~~

Let's update the `scripts` section manually and add a few extra items:
{: .padding-top}

#### package.json
~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && node_modules/.bin/webpack",
    "test": "echo \"No test specified\" && exit 1",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "eslint": "^3.3.0",
    "eslint-plugin-react": "^6.0.0",
    "file-loader": "^0.9.0",
    "source-map-loader": "^0.1.5",
    "ts-loader": "^0.8.2",
    "tslint": "^3.14.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.2",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "react": "^15.3.0",
    "react-dom": "^15.3.0"
  }
}

~~~

### Test the setup

Let's delete the `node_modules` and `typings` folders.

#### Install Again

~~~ bash
$ npm install
~~~

This will re-create the `node_modules` and `typings` folders as well as a new folder containing code generated by webpack called `_build` that was specified earlier in the `tsconfig.json`. 

> FYI: This generation of code was automatically done by `npm install` thanks to the `postinstall` section of the `package.json`. Once everything installs, we run `npm run typings` to create the `typings` folder and `node_modules/.bin/webpack` to run webpack. 
>
> Of course, you can run these in a terminal manually.

#### Linting

~~~ bash
$ npm run lint
~~~

No errors should appear. 

#### Testing

~~~ bash
$ npm test
~~~

This will return `No test specified. npm ERR! Test failed.  See above for more details`.


Now we have the intial setup. You can view my example of this [here](https://github.com/melxx001/redux-starter/tree/1-react-typescript-webpack){:target="_blank"}. My examples in github will have slight differences than the tutorial you read here. For instance, there will be extra files and packages because of Travis-CI and coveralls which I use for continuous integration.
{: .padding-top}

{: .padding-bottom}

## 2. Adding Webpack Dev Server

In development, we want to use [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html){:target="_blank"} in order to easily compile, bundle and reload code automatically. Trust me... It really sucks to have to manually do it.

Let's install it:

~~~ bash
$ npm install --save-dev webpack-dev-server
~~~

In the webpack setup Let's create a dev setup using the webpack configuration we initialy added in `webpack.config.js`. 

Add a `webpack.config.dev.js` in the root directory and paste the contents below. If you're already using something on port `8080`, then change the `localhost:8080` below to use another port.
{: .padding-top}

#### webpack.config.dev.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config'); // Get main config

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

Let's update the `scripts` section of the `package.json` manually with the data below to add a way to start the server:
{: .padding-top}

#### package.json
~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && npm run build",
    "test": "echo \"no test specified\" && exit 1",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.9.0",
    "eslint": "^3.0.1",
    "eslint-plugin-react": "^5.2.2",
    "file-loader": "^0.9.0",
    "source-map-loader": "^0.1.5",
    "ts-loader": "^0.8.2",
    "tslint": "^3.13.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.1",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.2.1",
    "react-dom": "^15.2.1"
  }
}
~~~

### Test the setup

Let's delete the `node_modules`, `_build` and `typings` folders.

#### Install Again

~~~ bash
$ npm install 
~~~ 

#### Linting

~~~ bash
$ npm run lint
~~~

No errors should appear. 

#### Testing

~~~ bash
$ npm test
~~~

This will return `No test specified. npm ERR! Test failed. See above for more details`.

#### Run Webpack Dev Server

~~~ bash
$ npm run dev
~~~

Browse to `http://localhost:8080/` and you should see `This page uses TypeScript and React!`

Open `Hello.tsx` in `src/components` and modify or add some of the text.

Ex:
{: .padding-top}

#### src/components/Hello.tsx

~~~ javascript
import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>UPDATED!! This page uses {this.props.compiler} and {this.props.framework}!</h1>;
  }
}
~~~

Upon saving, you should automatically see the updated text `UPDATED!! This page uses TypeScript and React!` on the browser. You can make more modification to test it more.

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/2-webpack-dev-server){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}

## 3. Adding Testing and Coverage

I have been recently obsessed with testing and 100% coverage. I use TDD to minimize bugs and it enables me to write better quality code. It's a process to learn and slower in the beginning but you'll be glad you did it.
{: .padding-top}

### Testing

I decided to use the [Tape](https://github.com/substack/tape){:target="_blank"} test module after reading [Why I use Tape Instead of Mocha & So Should You](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.mo56gj6jk){:target="_blank"} by [Eric Elliot](https://twitter.com/_ericelliott){:target="_blank"}.

I name my tests `<name>.test.ts` and save the file in the same folder of the file I'm testing.

For example, tests for utils.ts are in utils.test.ts.

~~~ bash
|-- src
  |-- utils.ts
  |-- utils.test.ts
  |-- Hello.tsx
  |-- Hello.test.tsx
|-- server.ts
|-- server.test.ts
~~~

Let's install the necessary items to run tests
{: .padding-top}

~~~ bash
$ npm install --save-dev tape react-addons-test-utils tap-spec
~~~

Note: Adding the tap-pec package is to make the test results look pretty.

Let's also grab the typescript declaration files for Tape and react-addons-test-utils.
{: .padding-top}

~~~ bash
$ node_modules/.bin/typings install tape -D
$ node_modules/.bin/typings install dt~react-addons-test-utils -SG
~~~

Let's update the `scripts` section of the `package.json` manually with the data below to add testing:
{: .padding-top}

#### package.json
~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape ./**/*.test.ts* | tap-spec",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.9.0",
    "eslint": "^3.0.1",
    "eslint-plugin-react": "^5.2.2",
    "file-loader": "^0.9.0",
    "react-addons-test-utils": "^15.3.0",
    "source-map-loader": "^0.1.5",
    "tap-spec": "^4.1.1",
    "tape": "^4.6.0",
    "ts-loader": "^0.8.2",
    "tslint": "^3.13.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.1",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.2.1",
    "react-dom": "^15.2.1"
  }
}
~~~

Add a test in the `src/components/` directory called `Hello.test.tsx`
{: .padding-top}

#### src/components/Hello.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';
import { createRenderer } from 'react-addons-test-utils';

import { Hello } from './Hello';

test('Hello Test', (t: test.Test) : void => {
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

If you now run `npm test` in a terminal, you will get similar output to :
{: .padding-top}

~~~ 
  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns h1


  total:     3
  passing:   3
  duration:  2.6s
~~~

### Coverage

I've had to look for a while to find a coverage tool that can easily be used with Typescript. I just recently found out that it is now possible to run [Istanbul](https://github.com/gotwarlost/istanbul){:target="_blank"} against TypeScript source code using Istanbul version [1.1.0-alpha.1](https://github.com/gotwarlost/istanbul/tree/v1.1.0-alpha.1){:target="_blank"}.

Let's add a file called `istanbul.yml` in the root directory

#### istanbul.yml

~~~ bash
verbose: false
instrumentation:
    default-excludes: true
reporting:
    print: summary
    reports:
      - lcov
      - text
      - html
    dir: ./coverage
    watermarks:
        statements: [50, 80]
        lines: [50, 80]
        functions: [50, 80]
        branches: [50, 80]

~~~

Let's install the necessary package to run coverage. 
{: .padding-top}

~~~ bash
$ npm install --save-dev --save-exact istanbul@1.1.0-alpha.1
~~~

Let's update the `scripts` section of the `package.json` manually with the data below to add coverage:
{: .padding-top}

#### package.json
~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts*' node_modules/.bin/tape ./**/*.test.ts* | tap-spec",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape ./**/*.test.ts* | tap-spec",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "eslint": "^3.3.0",
    "eslint-plugin-react": "^6.0.0",
    "file-loader": "^0.9.0",
    "istanbul": "1.1.0-alpha.1",
    "react-addons-test-utils": "^15.3.0",
    "source-map-loader": "^0.1.5",
    "tap-spec": "^4.1.1",
    "tape": "^4.6.0",
    "ts-loader": "^0.8.2",
    "tslint": "^3.14.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.2",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.2.1",
    "react-dom": "^15.2.1"
  }
}

~~~

Running `npm run cover` in a terminal will run test and display the coverage information in the terminal as well as create a `coverage` folder with an `index.html` which will show the coverage data in more details on a browser.
{: .padding-top}

The coverage display in the terminal should look similar to:

~~~ html
  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns h1
    =============================== Coverage summary ===============================
    Statements   : 100% ( 7/7 )
    Branches     : 100% ( 0/0 )
    Functions    : 100% ( 2/2 )
    Lines        : 100% ( 5/5 )
    ================================================================================


  total:     3
  passing:   3
  duration:  8.1s

~~~

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/3-add-testing-coverage){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}

## 4. Add client-side Routing

Initially let's add client-side routing which we'll eventually update to server-side routing. Also, we'll be adding Hot Module Replacement which is like live reloading for every module.

First let's install [React Router](https://github.com/reactjs/react-router){:target="_blank"} and the Typescript declaration for it.

~~~ bash
$ npm install --save react-router
$ node_modules/.bin/typings install react-router -S
~~~

### Create views

Create a directory named `views` in the `src` directory and add three views:

 - `src/views/index.tsx`
 - `src/views/about.tsx`
 - `src/views/404.tsx`

#### src/views/index.tsx

~~~ javascript
import * as React from 'react';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <h1>Index</h1>
    );
  }
}

~~~ 

#### src/views/about.tsx

~~~ javascript
import * as React from 'react';

export class About extends React.Component<any, any> {
  render() {
    return (
      <h1>About</h1>
    );
  }
}

~~~ 

#### src/views/404.tsx

~~~ javascript
import * as React from 'react';

export function NotFound() {
  return (
    <h1>404</h1>
  );
};

~~~ 

### Add Layout

Create a directory named `layout` in the `src` directory and add `index.tsx`.

#### src/layout/index.tsx

~~~ javascript
import * as React from 'react';
import { Link } from 'react-router';

export function Layout(props: React.Props<any>) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/hello">Hello</Link>
        </li>
      </ul>
      <div>
        {props.children}
      </div>
    </div>
  );
};

~~~ 

### Create Routes

#### Install packages to help in unit tests

~~~ bash
$ npm install --save-dev jsdom jsdom-global
$ node_modules/.bin/typings install dt~jsdom -DG
$ node_modules/.bin/typings install dt~jquery -DG
~~~

Create a directory named `routes` in the `src` directory and add `index.test.tsx` folder to test all the routes.
{: .padding-top}

#### src/routes/index.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';

import { render } from 'react-dom';
import { Router, createMemoryHistory } from 'react-router';
import Routes from '../routes';

require('jsdom-global')(); // Used to make available the DOM element document

const Routing = (
  <Router history={createMemoryHistory('/')}>
    {Routes}
  </Router>
);

test('Test Routes', (t: test.Test) : void => {
  let node = document.createElement('div');

  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('Index'), -1, 'Index page found');
  });

  Routing.props.history.push('/hello');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('This page uses TypeScript and React!'), -1, 'Hello page found');
  });

  Routing.props.history.push('/about');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('About'), -1, 'About page found');
  });

  Routing.props.history.push('/doesnotexist');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('404'), -1, '404 page found');
  });

  t.end();
});

~~~

Add `index.tsx` in the `src/routes` folder to setup the routes.
{: .padding-top}

#### src/routes/index.tsx

~~~ javascript
import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import {Hello} from '../components/Hello';
import {Layout} from '../layout';
import {About} from '../views/about';
import {Home} from '../views';
import {NotFound} from '../views/404';

const Component = (compiler: string, framework: string) => {
  return <Hello compiler={compiler} framework={framework} />;
};

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="/about" component={About} />
    <Route path="/hello" component={Component.bind(this, 'TypeScript', 'React')} />

    <Route path="*" component={NotFound} />
  </Route>
);

~~~ 

### Update Entry Point

Update `index.tsx` in the `src` folder with the contents below
{: .padding-top}

#### src/index.tsx

~~~ javascript
import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './routes';

const component = (
  <Router history={browserHistory}>
    {Routes}
  </Router>
);

render(component, document.getElementById('example'));

~~~

### Final touchups

Your `package.json` should look like this at this point:
{: .padding-top}

~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts*' node_modules/.bin/tape ./**/*.test.ts* | tap-spec",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape ./**/*.test.ts* | tap-spec",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "eslint": "^3.3.0",
    "eslint-plugin-react": "^6.0.0",
    "file-loader": "^0.9.0",
    "istanbul": "1.1.0-alpha.1",
    "jsdom": "^9.4.2",
    "jsdom-global": "^2.0.0",
    "react-addons-test-utils": "^15.3.0",
    "source-map-loader": "^0.1.5",
    "tap-spec": "^4.1.1",
    "tape": "^4.6.0",
    "ts-loader": "^0.8.2",
    "tslint": "^3.14.0",
    "typescript": "^1.8.10",
    "typings": "^1.3.2",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-router": "^2.6.1"
  }
}

~~~

Your root directory should look similar to:
{: .padding-top}
~~~ bash
|- _build
|- coverage
|- node_modules
|- src
  |- components
    |- Hello.tsx
  |- layout
    |- index.tsx
  |- routes
    |- index.test.tsx
    |- index.tsx
  |- views
    |- 404.tsx
    |- about.tsx
    |- index.tsx
  |- index.tsx
|- typings
|- .editorconfig
|- .eslintignore
|- .eslintrc
|- index.html
|- istanbul.yml
|- package.json
|- tsconfig.json
|- tslint.json
|- typings.json
|- webpack.config.dev.js
|- webpack.config.js
~~~

### Test the Setup

Run `npm run dev` in a terminal and browse to `http://localhost:8080/`. The initial page should should 3 links and `Index`
{: .padding-top}

 - Clicking on any link should not cause a page refresh
 - Clicking on `About` should display `About`
 - Clicking on `Hello` should display `This page uses TypeScript and React!`
 - Clicking on `Home` should display `Index`

We've successfully added `react-router` and have a basic working site. Yay!!

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/4-add-routing){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}

## 5. Add Redux

