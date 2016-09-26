---
layout: post
postid: 2016-09-25-universal-react-redux-typescript
published: true
comments: true
showcommentcount: true
date: 2016-09-25
# img: universal-react-redux-typescript.png
alt: Universal React Redux with Typescript
projectdate: September 2016
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

This post was inspired by Carey Hinoki's [repo](https://github.com/chemoish/react-universal-tutorial){:target="_blank"}.

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

#### .editorconfig

~~~ text
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
~~~ json
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
    "_client",
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
~~~ json
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
~~~ json
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
~~~ text
coverage
node_modules
typings
.idea
.git
_client

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
    path: path.join(__dirname, '_client'),
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
  t.equal(result.type, 'div', 'Check Hello returns div');

  t.end();
});


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
    return (
      <div>
        <h1>This page uses {this.props.compiler} and {this.props.framework}!</h1>
      </div>
    );
  }
}

~~~

### Test the setup

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
~~~ json
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
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

Let's delete the `node_modules` and `typings` folders.

#### Install Again

~~~ bash
$ npm install
~~~

This will re-create the `node_modules` and `typings` folders as well as a new folder containing code generated by webpack called `_client` that was specified earlier in the `tsconfig.json`. 

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
~~~ json
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
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
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

Let's delete the `node_modules`, `_client` and `typings` folders.

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
{: .padding-top}
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
    <div>
      <h1>UPDATED!! This page uses {this.props.compiler} and {this.props.framework}!</h1>
    </div>
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

~~~ json
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
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
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
  t.equal(result.type, 'div', 'Check Hello returns div');

  t.end();
});

~~~

If you now run `npm test` in a terminal, you will get similar output to :
{: .padding-top}

~~~ bash
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

~~~ yml
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
~~~ json
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts{,x}' node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
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

~~~ bash
  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns h1
    =============================== Coverage summary ===========
    Statements   : 100% ( 7/7 )
    Branches     : 100% ( 0/0 )
    Functions    : 100% ( 2/2 )
    Lines        : 100% ( 5/5 )
    ============================================================


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

### Test the setup

Your `package.json` should look like this at this point:

#### package.json

~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts{,x}' node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
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
|- _client
|- coverage
|- node_modules
|- src
  |- components
    |- Hello.test.tsx
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

Run `npm run dev` in a terminal and browse to `http://localhost:8080/`. The initial page should should 3 links and `Index`:
{: .padding-top}

 - Clicking on any link should not cause a page refresh
 - Clicking on `About` should display `About`
 - Clicking on `Hello` should display `This page uses TypeScript and React!`
 - Clicking on `Home` should display `Index`

We've successfully added `react-router` and have a basic working site. Yay!!

Run `npm test` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns h1

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found


  total:     7
  passing:   7
  duration:  4.4s


~~~

Run `npm run cover` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns h1

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found
    =============================== Coverage summary ===========
    Statements   : 100% ( 38/38 )
    Branches     : 100% ( 0/0 )
    Functions    : 100% ( 9/9 )
    Lines        : 100% ( 32/32 )
    ============================================================


  total:     7
  passing:   7
  duration:  10.2s


~~~

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/4-add-routing){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}

## 5. Add Redux

You probably should get familiarized with [Redux](http://redux.js.org/){:target="_blank"} if you haven't done so already. 

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

> There are 3 principles in Redux:
>  
1. Single immutable state tree which is a javascript object containing the state of the application
2. State is read-only and can only be changed by dispatching an actions which is a javascript object
  - the object should at minimum have a type property and it is recommended that it be a string because it is serializable
3. Reducer Function: takes the previous state of the app and the action and returns the new state. This function must be a pure function. 
Things you should never do inside a reducer:
  - Mutate its arguments;
  - Perform side effects like API calls and routing transitions;
  - Call non-pure functions, e.g. Date.now() or Math.random(). 

Let's install [redux](http://redux.js.org/){:target="_blank"}, [react-redux](https://github.com/reactjs/react-redux){:target="_blank"}, [react-router-redux](https://github.com/reactjs/react-router-redux){:target="_blank"}, [redux-thunk](https://github.com/gaearon/redux-thunk){:target="_blank"}, and the necessary Typescript declarations.

~~~ bash
$ npm install --save redux react-redux react-router-redux redux-thunk
$ node_modules/.bin/typings install dt~redux -SG
$ node_modules/.bin/typings install dt~react-redux -SG
$ node_modules/.bin/typings install dt~react-router-redux -SG
$ node_modules/.bin/typings install dt~react-router/history -SG
$ node_modules/.bin/typings install dt~es6-shim -SG
~~~

### Add Actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.

Let's create an action. Create a folder called `actions` in `src/components` and add `counter.test.ts` and `counter.ts`.

#### src/components/actions/counter.test.ts

~~~ javascript
import * as test from 'tape';
import * as counter from './counter';

test('Counter Actions Test', (t: test.Test) : void => {
  const increment = counter.increment();
  const decrement = counter.decrement();

  t.equal(increment.type, counter.INCREMENT, 'Test increment action');
  t.equal(decrement.type, counter.DECREMENT, 'Test decrement action');
  t.end();
});

~~~

#### src/components/actions/counter.ts

~~~ javascript
export const DECREMENT = 'DECREMENT';
export const INCREMENT = 'INCREMENT';

export interface Actions extends Object {
  type: string;
}

export function decrement() : Actions {
  return {
    type: DECREMENT,
  };
}

export function increment() : Actions {
  return {
    type: INCREMENT,
  };
}

~~~

### Add Reducers

Reducers specify how the application state changes in response to actions.

Create a folder called `reducers` in `src/components` and add `counter.test.ts` and `counter.ts`.

#### src/components/reducers/counter.test.ts

~~~ javascript
import * as test from 'tape';
import {increment, decrement} from '../actions/counter';
import {counterReducer} from './counter';

test('Reducers Test', (t: test.Test) : void => {
  t.equal(counterReducer(0, increment()), 1, 'Test increment');
  t.equal(counterReducer(1, decrement()), 0, 'Test decrement');
  t.equal(counterReducer(null, increment()), 1, 'Test null state');
  t.equal(counterReducer(undefined, increment()), 1, 'Test undefined state');
  t.equal(counterReducer(0, { type: 'unknown' }), 0, 'Test unknown action type');
  t.equal(counterReducer(), 0, 'Test missing action type');
  t.end();
});

~~~

#### src/components/reducers/counter.ts

~~~ javascript
import {DECREMENT, INCREMENT, Actions} from '../actions/counter';

export function counterReducer(state: number = 0, action: Actions = { type: '' }) {
  switch (action.type) {
    case DECREMENT:
      return state - 1;
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

~~~

### Add Counter Component

Add `Counter.test.tsx` and `Counter.tsx` in the `src/components` folder.

#### src/components/Counter.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';
import { createRenderer } from 'react-addons-test-utils';

import * as Actions from './actions/counter';
import {CounterComponent, mapDispatchToProps, getActions, mapStateToProps} from './Counter';

test('Counter Presentation Tests', (t: test.Test) : void => {
  const increment = (a: number) => { return a + 1; };
  const decrement = (a: number) => { return a - 1; };

  const test1 = <CounterComponent counter={0} decrement={decrement} increment={increment} />;
  t.deepEqual(test1.props,
    { counter: 0, decrement, increment }, 'Check Counter props');

  const renderer = createRenderer();
  renderer.render(<CounterComponent counter={0} decrement={increment} increment={decrement} />);
  const result = renderer.getRenderOutput();
  t.equal(result.type, 'div', 'Check Counter returns div');

  t.end();
});

test('Counter Tests', (t: test.Test) : void => {
  let actions: any = {
    a: 1,
    b: 2,
    method1: (a: number) => (a + 1),
    method2: (a: number) => (a - 1),
  };
  let test: any = getActions(actions);
  let expected: any = {method1: actions.method1, method2: actions.method2};

  t.deepEqual(test, expected, 'Check getActions method');

  const state = {
    counterReducer: 1
  };

  t.deepEqual(mapStateToProps(state), {counter: 1}, 'Check mapStateToProps method');

  actions = Actions;
  test = Object.keys(mapDispatchToProps(''));
  expected = Object.keys(Actions).filter(a => (typeof actions[a] === 'function'));
  t.deepEqual(test, expected, 'Check mapDispatchToProps method');

  t.end();
});

~~~

#### src/components/Counter.tsx

~~~ javascript
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from './actions/counter';

export interface CounterProps {
  counter: number;
  increment: Function;
  decrement: Function;
}

export class CounterComponent extends React.Component<CounterProps, any>  {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <div>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.decrement}>Decrement</button>
        </div>
      </div>
    );
  }
}

export const getActions = (actions: any) : any => {
  const obj: any = {};
  const filter: any = Object.keys(actions).filter(a => (typeof actions[a] === 'function'));

  filter.forEach((item: any) => {
    obj[item] = actions[item];
  });

  return obj;
};

export const mapStateToProps = (state: any) => ({
    counter: state.counterReducer
});

export const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(getActions(Actions), dispatch);
};

const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponent as any);

export {
  Counter
};

~~~

> Note: In the code above, I use `CounterComponent` for the component that will display the counter and the buttons.
You'll notice also that `this.props.counter` is used instead of it being `this.state.counter`. 
The exported `Counter` that will be used to display the counter will work automatically thanks to the `const Counter = connect(mapStateToProps, mapDispatchToProps)(CounterComponent as any);` lines below.

### Add Root Reducer

All the reducers in your app can be combined into a single reducer called a root reducer.

Add a file called `rootReducer.ts` in the `src` directory.

#### src/rootReducer.ts

~~~ javascript
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {counterReducer} from './components/reducers/counter';

export default combineReducers({
  counterReducer,
  routing: routerReducer
});

~~~

### Add Store

The Store is the object that brings actions and reducers together. There's only one store in a Redux application.

Add `store.test.ts` and `store.ts` in the `src` directory.

#### src/store.test.ts

~~~ javascript
import * as React from 'react';
import * as test from 'tape';

import configureStore from './store';
declare const module: { hot: any };

test('Test Store', (t: test.Test) : void => {
  let store = configureStore();
  t.equal(store.getState().counterReducer, 0, 'Check default store data');

  store = configureStore({ counterReducer: 1 });
  t.equal(store.getState().counterReducer, 1, 'Check store data');


  module.hot = {
    accept: (dep: any, callback: Function) => {
      callback();
    }
  };
  store = configureStore({ counterReducer: 0 }, module);
  t.equal(store.getState().counterReducer, 0, 'Check hot module replacement');

  t.end();
});

~~~

#### src/store.ts

~~~ javascript
const thunk = require('redux-thunk').default;
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
declare const module: { hot: any };

export default function configureStore(initialState: any = { counterReducer: 0 }, mod: any = module) : any {
  const store: any = createStoreWithMiddleware(rootReducer, initialState);

  if (mod.hot && typeof mod.hot.accept === 'function') {
    mod.hot.accept('./reducer', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

~~~

### Update View

Update `index.tsx` in the `src/views` folder to use the counter

~~~ javascript
import * as React from 'react';
import {Counter} from '../components/Counter';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <Counter />
      </div>
    );
  }
}

~~~

### Update Entry Point

Update `index.tsx` in the `src` directory to use the counter.

#### src/index.tsx

~~~ javascript
import * as React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import configureStore from './store';
import Routes from './routes';

const store = configureStore();

const Component = (
  <Provider store={store} key="provider">
    <Router history={browserHistory} routes={Routes} />
  </Provider>
);

render(Component, document.getElementById('example'));

~~~

### Update Route test

Update `index.test.tsx` in the `src/routes` directory to add the store to the test.

#### src/routes/index.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';
import {Provider} from 'react-redux';
import { render } from 'react-dom';
import { Router, createMemoryHistory } from 'react-router';
import Routes from '../routes';
import configureStore from '../store';

require('jsdom-global')(); // Used to make available the DOM element document

const store = configureStore();

const Routing = (
  <Provider store={store} key="provider">
    <Router history={createMemoryHistory('/')}>
      {Routes}
    </Router>
  </Provider>
);

test('Test Routes', (t: test.Test) : void => {
  let node = document.createElement('div');

  render(Routing, node, () => {
    t.notEqual(node.textContent.indexOf('Index'), -1, 'Index page found');
  });

  Routing.props.children.props.history.push('/hello');
  render(Routing, node, () => {
    t.notEqual(node.textContent.indexOf('This page uses TypeScript and React!'), -1, 'Hello page found');
  });

  Routing.props.children.props.history.push('/about');
  render(Routing, node, () => {
    t.notEqual(node.textContent.indexOf('About'), -1, 'About page found');
  });

  Routing.props.children.props.history.push('/doesnotexist');
  render(Routing, node, () => {
    t.notEqual(node.textContent.indexOf('404'), -1, '404 page found');
  });

  t.end();
});

~~~

### Test the setup

Your `package.json` should look like this at this point:

~~~ bash
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts{,x}' node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings && npm run build",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
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
    "react": "^15.3.2",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "react-router-redux": "^4.0.6",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0"
  }
}

~~~

Your root directory should look similar to:
{: .padding-top}

~~~ bash
|- _client
|- coverage
|- node_modules
|- src
  |- components
    |- actions
      |- counter.test.ts
      |- counter.ts
    |- reducers
      |- counter.test.ts
      |- counter.ts
    |- Counter.test.tsx
    |- Counter.tsx
    |- Hello.test.tsx
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
  |- rootReducer.ts
  |- store.test.ts
  |- store.ts
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

Let’s delete the `node_modules`, `_client` and `typings` folders.
{: .padding-top}

Stop any previous run and install everything again.

~~~ bash
$ npm install
~~~

Run `npm run dev` in a terminal and browse to `http://localhost:8080/`. The initial page should should 3 links (Home, About, Hello), `Index`, `Counter: 0` and 2 buttons `Increment` and `Decrement`.
{: .padding-top}

 - Clicking on Increment will increase the counter
 - Clicking on Decrement will decrease the counter
 - Clicking on any link should not cause a page refresh
 - Clicking on `About` should display `About`
 - Clicking on `Hello` should display `This page uses TypeScript and React!`
 - Clicking on `Home` should display `Index` and the counter in the same state as when you left it

We've successfully added `Redux`.

Run `npm test` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Reducers Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement


  total:     23
  passing:   23
  duration:  6.8s


~~~

Run `npm run cover` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Reducers Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement
    =============================== Coverage summary ===============================
    Statements   : 100% ( 94/94 )
    Branches     : 100% ( 15/15 )
    Functions    : 100% ( 21/21 )
    Lines        : 100% ( 80/80 )
    ================================================================================


  total:     23
  passing:   23
  duration:  12.5s


~~~

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/5-add-redux){:target="_blank"}
{: .padding-top}

{: .padding-bottom}

## 6. Universal

In this iteration, we will modify this app to be Universal / Isomorphic which means changing it into code that runs on the server and on the client. Check out this interesting [article](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.4yxg8mbk7){:target="_blank"}.

We'll use [Express](http://expressjs.com/){:target="_blank"} as our web server. Let's install [Enzyme](http://airbnb.io/enzyme/){:target="_blank"} to help us test React components. 

We'll also install [concurrently](https://github.com/kimmobrunfeldt/concurrently){:target="_blank"} and [wait-run](https://github.com/RickWong/wait-run){:target="_blank"} to help us run things.

~~~ bash
$ npm install --save express
$ npm install --save-dev concurrently wait-run enzyme
$ node_modules/.bin/typings install express -S
$ node_modules/.bin/typings install dt~enzyme -SG
~~~

Update the `.eslintignore` file to ignore the `_server` folder which will be create when you start the server.
{: .padding-top}

#### .eslintignore

~~~ text
coverage
node_modules
typings
.idea
.git
_client
_server

~~~

Let's also delete the `index.html` file in your root directory. It won't be needed anymore.
{: .padding-top}

### Update webpack

Let's modify the webpack configuration to separate client and server:

Delete the file `webpack.config.dev.js` and replace the contents of the file `webpack.config.js` with the following:

#### webpack.config.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const path = require('path');

const config = {
  debug: false,
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
};

module.exports = config;

~~~
{: .padding-bottom}

Next create the following client and server webpack configurations in your root: `webpack.config.server.js`, `webpack.config.server.dev.js`, `webpack.config.client.js` and `webpack.config.client.dev.js`.
{: .padding-top}

#### webpack.config.server.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

config.target = 'node';

config.entry = {
  index: [
    './src/server.tsx',
  ],
};

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, '_server'),
};

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: true,
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

config.externals = fs.readdirSync('node_modules').reduce((accumulator, module) => {
  accumulator[module] = 'commonjs ' + module;
  return accumulator;
}, {});

module.exports = config;

~~~

#### webpack.config.server.dev.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config.server');

config.cache = true;
config.debug = true;
config.devtool = 'source-map';
config.watch = true;

config.entry.index.unshift(
  'webpack/hot/poll?1000'
);

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: false,
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

module.exports = config;

~~~

#### webpack.config.client.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');


const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

config.entry = {
  index: [
    './src/index.tsx',
  ],
};

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, '_client'),
  publicPath: 'assets',
};

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: true,
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

module.exports = config;

~~~

#### webpack.config.client.dev.js

~~~ javascript
// Used for on-the-fly transpilation. This is only needed in the
// webpack config file to use ES6
require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config.client');

const hostname = 'localhost';
const port = '3000';

config.cache = true;
config.debug = true;
config.devtool = 'inline-source-map';

config.entry.index.unshift(
  `webpack-dev-server/client?http://${hostname}:${port}/`,
  'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://' + hostname + ':' + port + '/client';

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: false,
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

config.devServer = {
  hot: true,
  https: false,
  inline: true,
  noInfo: true,
  port: port,
};

module.exports = config;

~~~

### Add server file

Now let's add the server file that will run express. Create `server.tsx` in the `src` directory.
{: .padding-top}

#### src/server.tsx

~~~ javascript
import * as express from 'express';
import * as React from 'react';

import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import configureStore from './store';
import HtmlContainer from './layout/html';
import RouteContainer from './routes';

let Html = HtmlContainer;
let Route = RouteContainer;

const app = express();
const hostname = 'localhost';
const port = 8080;
const sitePort = 3000;

function getMarkup(store: any, render_props: any) {
  const uri = `http://${hostname}:${sitePort}`;

  const component = (
    <Provider store = {store} key = "provider">
      <RouterContext {...render_props} />
    </Provider>
);

  return '<!doctype html>' + renderToString(
      <Html
        component = {component}
        script = {`${uri}/client/index.js`}
        state = {store.getState()}
/>
);
}

app.use(function (req: any, res: any) {
  match({
    location: req.url,
    routes: Route
  }, function (error, redirectionLocation, render_props) {
    if (error) {
      console.error('Router error:', error);

      res.status(500).send(error.message);
    } else if (redirectionLocation) {
      res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
    } else if (render_props) {
      const store = configureStore({});

      res.status(200).send(getMarkup(store, render_props));
    } else {
      res.status(400).send('Not Found');
    }
  });
});

declare const module: { hot: any };

app.listen(port, function (error: any) {
    if (error) {
      console.error(error);
    } else {
      console.info(`==> Open up http://${hostname}:${port}/ in your browser.`);
    }
  });

if (module.hot) {
  console.info('[HMR] Server is listening…');

  module.hot.accept('./layout/html', function () {
    console.info('[HMR] Patching Html');

    Html = require('./layout/html').default;
  });

  module.hot.accept('./routes', function () {
    console.info('[HMR] Patching Route');

    Route = require('./routes').default;
  });
}

~~~

### Add HTML layout

Add an HTML layout file `html.tsx` in `src/layout` directory.
{: .padding-top}

#### src/layout/html.tsx

~~~ javascript
import * as React from 'react';

import { renderToString } from 'react-dom/server';

export function Html(props: any) {
  const {
    component,
    script,
    state
  } = props;

  const content = component ? renderToString(component) : '';

  return (
    <html className = "no-js" lang = "en">
    <head>
      <meta charSet = "utf-8" />
      <meta httpEquiv = " x-ua-compatible" content = "ie=edge" />
      <title>Add Universal</title>
      <meta name ="description" content ="Get started with React, React Router, Redux, and Universal." />
      <meta name ="viewport" content ="width=device-width, initial-scale=1" />
    </head>
{% raw %}
    <body>
      <div id="example" dangerouslySetInnerHTML={{ __html: content }} />

      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};` }} />
      <script src={script} />
    </body>
    </html>
{% endraw %}
);
}

export default Html;

~~~

### Test the setup

Your current directory should look similar to this:

~~~ bash
|- _client
|- coverage
|- node_modules
|- src
  |- components
    |- actions
      |- counter.test.ts
      |- counter.ts
    |- reducers
      |- counter.test.ts
      |- counter.ts
    |- Counter.test.tsx
    |- Counter.tsx
    |- Hello.test.tsx
    |- Hello.tsx
  |- layout
    |- html.tsx
    |- index.tsx
  |- routes
    |- index.test.tsx
    |- index.tsx
  |- views
    |- 404.tsx
    |- about.tsx
    |- index.tsx
  |- index.tsx
  |- rootReducer.ts
  |- server.tsx
  |- store.test.ts
  |- store.ts
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
|- webpack.config.client.dev.js
|- webpack.config.client.js
|- webpack.config.js
|- webpack.config.server.dev.js
|- webpack.config.server.js
~~~

Let’s update the scripts section of the package.json manually with the data below.
{: .padding-top}

#### package.json

~~~ json
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts{,x}' node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "dev": "node ./node_modules/.bin/concurrently --kill-others \"npm run watch-server\" \"npm run watch-client\" \"npm run dev-server\"",
    "dev-server": "node_modules/.bin/wait-run -p \"_server/index.js\" \"node ./_server\"",
    "watch-client": "node_modules/.bin/webpack-dev-server --config webpack.config.client.dev.js",
    "watch-server": "rm -rf _server && node_modules/.bin/webpack --colors --config webpack.config.server.dev.js",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "concurrently": "^2.2.0",
    "enzyme": "^2.4.1",
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
    "wait-run": "^1.2.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "express": "^4.14.0",
    "react": "^15.3.2",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "react-router-redux": "^4.0.6",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0"
  }
}

~~~

Let’s delete the `node_modules`, `_client` and `typings` folders.
{: .padding-top}

Stop any previous run and install everything again:

~~~ bash
$ npm install
~~~

Run `npm run dev` in a terminal and browse to `http://localhost:8080/`. The initial page should should 3 links (Home, About, Hello), `Index`, `Counter: 0` and 2 buttons `Increment` and `Decrement`:
{: .padding-top}

 - Clicking on Increment will increase the counter
 - Clicking on Decrement will decrease the counter
 - Clicking on any link should not cause a page refresh
 - Clicking on `About` should display `About`
 - Clicking on `Hello` should display `This page uses TypeScript and React!`
 - Clicking on `Home` should display `Index` and the counter in the same state as when you left it
 - Viewing page source on each link should show the HTML you see on the page

Run `npm test` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Reducers Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement


  total:     23
  passing:   23
  duration:  6.8s


~~~

Run `npm run cover` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Reducers Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement
    =============================== Coverage summary ===============================
    Statements   : 100% ( 94/94 )
    Branches     : 100% ( 15/15 )
    Functions    : 100% ( 21/21 )
    Lines        : 100% ( 80/80 )
    ================================================================================


  total:     23
  passing:   23
  duration:  12.5s


~~~

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/6-make-universal){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}


## 7. Add ToDo App

We have a page with a counter and now we're going to add a todo app.

Let's add the action. Add a `todo.test.ts` and `todo.ts` in `src/components/actions` folder.
{: .padding-top}

#### src/components/actions/todo.test.ts

~~~ javascript
import * as test from 'tape';
import * as todo from './todo';

test('Todo Actions Test', (t: test.Test) : void => {
  let addTodo = todo.addTodo('item 1');
  t.equal(addTodo.id,  0, 'Test addTodo 1');
  addTodo = todo.addTodo('item 2');
  t.equal(addTodo.id,  1, 'Test addTodo 2');
  addTodo = todo.addTodo('item 3');
  t.equal(addTodo.id,  2, 'Test addTodo 3');

  const setVisibilityFilter = todo.setVisibilityFilter('hide');
  t.deepEqual(setVisibilityFilter, {type: todo.SET_VISIBILITY_FILTER, filter: 'hide'}, 'Test setVisibilityFilter');

  const toggleTodo = todo.toggleTodo(10);
  t.deepEqual(toggleTodo, {type: todo.TOGGLE_TODO, id: 10}, 'Test toggleTodo');
  
  t.end();
});

~~~

#### src/components/actions/todo.ts

~~~ javascript
let nextTodoId = 0;

export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (text: string) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
  };
};

export const setVisibilityFilter = (filter: string) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
};

export const toggleTodo = (id: Number) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

~~~

Let's add the reducer. Add a `todo.test.ts` and `todo.ts` in `src/components/reducers` folder.
{: .padding-top}

#### src/components/reducers/todo.test.ts

~~~ javascript
import * as test from 'tape';
import {addTodo, setVisibilityFilter, toggleTodo} from '../actions/todo';
import {todoReducer, todo, visibilityFilterReducer} from './todo';

test('Todo Reducer Test', (t: test.Test) : void => {
  let init = addTodo('item 1');

  t.deepEqual(todo({}, init), { id: init.id++, text: 'item 1', completed: false }, 'Test addTodo 1');
  t.deepEqual(todo({}, addTodo('item 2')), { id: init.id++, text: 'item 2', completed: false }, 'Test addTodo 2');
  t.deepEqual(todo({}, addTodo('item 3')), { id: init.id++, text: 'item 3', completed: false }, 'Test addTodo 3');
  t.deepEqual(todo(null, addTodo('item 4')), { id: init.id++, text: 'item 4', completed: false }, 'Test addTodo 4');

  t.deepEqual(todo({id: 0}), {id: 0}, 'Test addTodo 5');

  t.deepEqual(todo({ id: 1 }, toggleTodo(1)), { id: 1, completed: true }, 'Test toggleTodo 1');
  t.deepEqual(todo({ id: 0 }, toggleTodo(1)), { id: 0 }, 'Test toggleTodo 2');
  t.deepEqual(todo({}, toggleTodo(1)), {}, 'Test toggleTodo 3');
  t.deepEqual(todo(undefined, toggleTodo(1)), {}, 'Test toggleTodo 4');

  t.deepEqual(
    todoReducer([], addTodo('item 5')),
    [{ id: init.id++, text: 'item 5', completed: false }],
    'Test addTodo todoReducer 1'
  );

  t.deepEqual(todoReducer(
    [{ id: 4, text: 'item 5', completed: false }], addTodo('item 5')),
    [{ completed: false, id: 4, text: 'item 5' }, { completed: false, id: init.id++, text: 'item 5' }],
    'Test addTodo todoReducer 2'
  );

  t.deepEqual(todoReducer(
    [{ id: 1 }, { id: 0 }], toggleTodo(1)),
    [{ completed: true, id: 1 }, { id: 0 }],
    'Test toggle todoReducer 1'
  );

  t.deepEqual(todoReducer(),
    [],
    'Test default todoReducer 1'
  );

  t.deepEqual(todoReducer([{ id: 1 }, { id: 0 } ]),
    [{ id: 1 }, { id: 0 } ],
    'Test default todoReducer 2'
  );

  t.equal(
    visibilityFilterReducer(undefined, setVisibilityFilter('SHOW')),
    'SHOW',
    'Test visibilityFilter 1'
  );

  t.equal(
    visibilityFilterReducer(),
    'SHOW_ALL',
    'Test visibilityFilter 2'
  );

  t.equal(
    visibilityFilterReducer(undefined, setVisibilityFilter('')),
    'SHOW_ALL',
    'Test visibilityFilter 3'
  );

  t.end();
});


~~~

#### src/components/reducers/todo.ts

~~~ javascript
import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO} from '../actions/todo';

export interface TodoState extends Object {
  id?: number;
  text?: string;
  completed?: Boolean;
}

export const todo = (state: TodoState = {}, action: any = { type: '' }) : TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

export const todoReducer = (state: Array<TodoState> = [], action: any = { type: '' }) : Array<any> => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case TOGGLE_TODO:
      return state.map((t: TodoState) : TodoState => todo(t, action));
    default:
      return state;
  }
};

export const visibilityFilterReducer = (state: string = 'SHOW_ALL',
                                        action: any = { type: '', filter : '' }) : string => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter ? action.filter : state;
    default:
      return state;
  }
};

~~~
{: .padding-bottom}

Let's add the Todo Component. I decided to put everything in one file to make it a little simpler to follow. Usually, you would separate the ToDo component into presentation and container components.
{: .padding-top}

Add a `Todo.test.tsx` and a `Todo.tsx` in `src/components`. 
{: .padding-top}

#### src/components/Todo.test.tsx

~~~ javascript
import * as React from 'react';
import * as test from 'tape';
import { createRenderer, Simulate } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import configureStore from '../store';
import {mount} from 'enzyme';

import {
  LinkComponent, Todo, TodoList, Footer, AddTodoComponent,
  AddTodo, VisibleTodoList,
  filterLinkMapDispatchToProps, getVisibleTodos,
  ToDoApp
} from './Todo';

test('Todo Presentation Tests', (t: test.Test) : void => {
  let onClick = () => {};
  let onClick2 = (id: number) => {
    return () => id + 1;
  };
  let renderer: any;
  let result: any;

  let test = <LinkComponent active={true} onClick={onClick}>Test</LinkComponent>;
  t.deepEqual(test.props, { active: true, onClick: onClick, children: 'Test' }, 'Check LinkComponent props');
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'span', 'Check LinkComponent tag 1');

  test = <LinkComponent active={false} onClick={onClick}>{''}</LinkComponent>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'a', 'Check LinkComponent tag 2');
  t.equal(result.props.children, '', 'Check LinkComponent props children');
  t.equal(typeof result.props.onClick, 'function', 'Check LinkComponent props onclick');

  test = <Todo onClick={onClick} completed={false} text="Active"/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'li', 'Check Todo tag');
  t.deepEqual(result.props.style, { textDecoration: 'none' }, 'Check Todo props style 1');
  t.equal(result.props.children, 'Active', 'Check Todo props children');
  t.equal(result.props.onClick, onClick, 'Check Todo props onClick');

  test = <Todo onClick={onClick} completed={true} text="Active"/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.deepEqual(result.props.style, { textDecoration: 'line-through' }, 'Check Todo props style 2');

  let todoArr = [{ id: 0, completed: false, text: 'Test' }];
  test = <TodoList todos={todoArr} onTodoClick={onClick2.bind(this)}/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'ul', 'Check TodoList tag');
  t.true(Array.isArray(result.props.children), 'Check TodoList props children array');

  test = <Footer/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'p', 'Check Footer tag');

  t.end();
});

test('Todo Container Tests', (t: test.Test) : void => {
  const store = configureStore();

  // AddTodo container tests
  const addTodoWrapper = mount(
    <Provider store={store} key="provider">
      <AddTodo />
    </Provider>
  );
  const addTodo: any = addTodoWrapper.find(AddTodo);
  const addTodoComponent: any = addTodo.find(AddTodoComponent);
  t.equal(addTodoComponent.text(), addTodo.text(), 'Check AddTodo text');

  // FilterLink filterLinkMapDispatchToProps function tests
  const filterlink = filterLinkMapDispatchToProps(() => { return 'dispatch'; }, 'SHOW_ALL');
  t.true(filterlink.hasOwnProperty('onClick'), 'Check if filterLink\'s MapDispatchToProps returns onClick');
  t.equal(filterlink.onClick(), 'dispatch', 'Check filterLink\'s MapDispatchToProps function');

  // getVisibleTodos helper function tests
  const todosArray = [
    { text: 'item1', completed: true },
    { text: 'item2', completed: false },
    { text: 'item3', completed: true },
  ];
  const showAll = getVisibleTodos(todosArray, 'SHOW_ALL');
  const showCompleted = getVisibleTodos(todosArray, 'SHOW_COMPLETED');
  const showActive = getVisibleTodos(todosArray, 'SHOW_ACTIVE');

  t.deepEqual(getVisibleTodos(todosArray), showAll, 'Check getVisibleTodos default filter');
  t.equal(showAll.length, 3, 'Check getVisibleTodos SHOW_ALL filter 1');
  t.equal(showAll[2].text, 'item3', 'Check getVisibleTodos SHOW_ALL filter 2');

  t.equal(showCompleted.length, 2, 'Check getVisibleTodos SHOW_COMPLETED filter 1');
  t.equal(showCompleted[1].text, 'item3', 'Check getVisibleTodos SHOW_COMPLETED filter 2');

  t.equal(showActive.length, 1, 'Check getVisibleTodos SHOW_ACTIVE filter 1');
  t.equal(showActive[0].text, 'item2', 'Check getVisibleTodos SHOW_ACTIVE filter 2');

  // VisibleTodoList container tests
  const visibleTodoListWrapper = mount(
    <Provider store={store} key="provider">
      <VisibleTodoList />
    </Provider>
  );
  const visibleTodoList: any = visibleTodoListWrapper.find(VisibleTodoList);
  const todoList: any = visibleTodoList.find(TodoList);
  t.equal(visibleTodoList.text(), todoList.text(), 'Check visibleTodoList text');


  // Full app unit tests
  const provider =
    <Provider store={store} key="provider">
      <ToDoApp />
    </Provider>;

  const toDoAppWrapper = mount(provider);
  const toDoApp: any = toDoAppWrapper.find(ToDoApp);
  const input = toDoApp.find('input').get(0);
  const form = toDoApp.find('form');
  let list: any = toDoApp.find('ul').find('li');
  t.equal(list.length, 0 , 'Check empty number of to do items');

  // Add items
  input.value = '';
  form.simulate('submit');

  input.value = 'item 1';
  form.simulate('submit');

  input.value = 'item 2';
  form.simulate('submit');

  list = toDoApp.find('ul').find('li');
  t.equal(list.length, 2 , 'Check number of to do items added');
  t.equal(list.get(0).textContent, 'item 1' , 'Check value of item 1');
  t.equal(list.get(1).textContent, 'item 2' , 'Check value of item 2');
  t.notEqual(
    list.get(1).getAttribute('style').indexOf('text-decoration: none;'),
    -1,
    'Check if initial item has no text decoration'
  );

  // click on an item to strike them
  Simulate.click(list.get(1));
  t.notEqual(
    list.get(1).getAttribute('style').indexOf('text-decoration: line-through;'),
    -1,
    'Check if clicked item has text decoration'
  );

  t.end();
});

~~~

#### src/components/Todo.tsx

~~~ javascript
import * as React from 'react';
import {connect} from 'react-redux';
import {addTodo, setVisibilityFilter, toggleTodo} from './actions/todo';
import {TodoState} from './reducers/todo';
import {ReducerState} from '../rootReducer';

// Setup the presentation link component which will display the links
// needed to manipulate what to show.
export interface LinkProps extends Object {
  active: Boolean;
  children?: Node;
  onClick: Function;
}
export class LinkComponent extends React.Component<LinkProps, any> {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    if (this.props.active) {
      return (
        <span>{this.props.children}</span>
      );
    }

    return (
      <a href="#" onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  }
}

// Setup the presentation to do component which displays a to do item
export interface TodoProps extends Object {
  onClick: Function;
  completed: Boolean;
  text: string;
}
export class Todo extends React.Component<TodoProps, any> {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    completed: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
  };
{% raw %}
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}
      >
        {this.props.text}
      </li>
    );
  } {% endraw %}
}

// Setup the presentation to do list component which will display a
// bulleted list of the added items
export interface TodoListProps extends Object {
  todos: Array<TodoState>;
  onTodoClick: Function;
}
export class TodoList extends React.Component<TodoListProps, any> {
  static propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      completed: React.PropTypes.bool.isRequired,
      text: React.PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ul>
        {this.props.todos.map((todo: TodoState) =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => this.props.onTodoClick(todo.id)}
            ref={'todo_' + todo.id}
          />
        )}
      </ul>
    );
  }
}

// Setup the presentation component to display the various links
export class Footer extends React.Component<any, any>  {
  render() {
    return (
      <p>
        Show: {' '}
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </p>
    );
  }
}

// Setup the container component for the input form to add an item
export interface AddTodoProps extends Object {
  dispatch: Function;
}
export class AddTodoComponent extends React.Component<AddTodoProps, any> {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  render() {
    let input: HTMLInputElement;
    return (
      <div>
        <form onSubmit={(e: Event) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          this.props.dispatch(addTodo(input.value));
          input.value = '';
        }}>
          <input ref={(node: HTMLInputElement) => {input = node;}} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
export const AddTodo = connect()(AddTodoComponent as any);

// Setup the container component to update the links based on a filter
export const filterLinkMapStateToProps = (state: ReducerState, ownProps: any) => {
  return {
    active: ownProps.filter === state.visibilityFilterReducer
  };
};

export const filterLinkMapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    onClick: () => {
      return dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

export const FilterLink = connect(
  filterLinkMapStateToProps,
  filterLinkMapDispatchToProps
)(LinkComponent as any);

// Setup the container component to decide what items to show based on what was link was clicked
export const getVisibleTodos = (todos: any , filter: string = '') => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t: any) : Boolean => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t: any) : Boolean => !t.completed);
    default:
      return todos;
  }
};

export const VisibleTodoList = connect(
  (state: ReducerState) => {
    return {
      todos: getVisibleTodos(state.todoReducer, state.visibilityFilterReducer)
    };
  },
  (dispatch: Function) => {
    return {
      onTodoClick: (id: number) => {
        dispatch(toggleTodo(id));
      }
    };
  }
)(TodoList as any);

// Export the Full App
export const ToDoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

~~~

Let's update to the Root Reducer to add to todo one. Update `rootReducer.ts` in `src`.
{: .padding-top}

#### src/rootReducer.ts

~~~ javascript
import {combineReducers, Reducer} from 'redux';
import {routerReducer} from 'react-router-redux';
import {counterReducer} from './components/reducers/counter';
import {todoReducer, visibilityFilterReducer} from './components/reducers/todo';

export interface ReducerState {
  todoReducer: Array<any>;
  visibilityFilterReducer: string;
  counterReducer: Number;
  routing: Reducer<any>;
}

export default combineReducers({
  todoReducer,
  visibilityFilterReducer,
  counterReducer,
  routing: routerReducer
});

~~~

Let's update the route to add the path. Update `index.tsx` in `src/routes`.
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
import {ToDoApp} from '../components/Todo';

const Component = (compiler: string, framework: string) => {
  return <Hello compiler={compiler} framework={framework} />;
};

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="/about" component={About} />
    <Route path="/hello" component={Component.bind(this, 'TypeScript', 'React')} />
    <Route path="/todo" component={ToDoApp} />

    <Route path="*" component={NotFound} />
  </Route>
);

~~~

Let's update the layout to add the new path. Update `index.tsx` in `src/layout`.
{: .padding-top}

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
        <li>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
      <div>
        {props.children}
      </div>
    </div>
  );
};

~~~

Let's test the whole thing!!
{: .padding-top}

Your current directory should look similar to this:

~~~ bash
|- _server
|- coverage
|- node_modules
|- src
  |- components
    |- actions
      |- counter.test.ts
      |- counter.ts
      |- todo.test.ts
      |- todo.ts
    |- reducers
      |- counter.test.ts
      |- counter.ts
      |- todo.test.ts
      |- todo.ts
    |- Counter.test.tsx
    |- Counter.tsx
    |- Hello.test.tsx
    |- Hello.tsx
    |- Todo.test.tsx
    |- Todo.tsx
  |- layout
    |- html.tsx
    |- index.tsx
  |- routes
    |- index.test.tsx
    |- index.tsx
  |- views
    |- 404.tsx
    |- about.tsx
    |- index.tsx
  |- index.tsx
  |- rootReducer.ts
  |- server.tsx
  |- store.test.ts
  |- store.ts
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
|- webpack.config.client.dev.js
|- webpack.config.client.js
|- webpack.config.js
|- webpack.config.server.dev.js
|- webpack.config.server.js
~~~

Let’s delete the `node_modules`, `_server` and `typings` folders.
{: .padding-top}

Stop any previous run and install everything again:

~~~ bash
$ npm install
~~~

Run `npm run dev` in a terminal and browse to `http://localhost:8080/`. The initial page should should 4 links (Home, About, Hello, Todo), `Index`, `Counter: 0` and 2 buttons `Increment` and `Decrement`.
{: .padding-top}

 - All the pages should behaves as described previously
 - Clicking on `Todo` should display a input form, a button and `Show: All, Active, Completed`
 - Adding text in the input field and clicking the button will add the text to the page
 - Click on the text that was added will strike it
 - Clicking on the `Active` link should only show the items that have not been striked
 - Clicking on the `Completed` link should only show the items that have been striked
 - Clicking on the `All` link should only show all the items

Run `npm test` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Todo Actions Test

    ✔ Test addTodo 1
    ✔ Test addTodo 2
    ✔ Test addTodo 3
    ✔ Test setVisibilityFilter
    ✔ Test toggleTodo

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Counter Reducer Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Todo Reducer Test

    ✔ Test addTodo 1
    ✔ Test addTodo 2
    ✔ Test addTodo 3
    ✔ Test addTodo 4
    ✔ Test addTodo 5
    ✔ Test toggleTodo 1
    ✔ Test toggleTodo 2
    ✔ Test toggleTodo 3
    ✔ Test toggleTodo 4
    ✔ Test addTodo todoReducer 1
    ✔ Test addTodo todoReducer 2
    ✔ Test toggle todoReducer 1
    ✔ Test default todoReducer 1
    ✔ Test default todoReducer 2
    ✔ Test visibilityFilter 1
    ✔ Test visibilityFilter 2
    ✔ Test visibilityFilter 3

  Todo Presentation Tests

    ✔ Check LinkComponent props
    ✔ Check LinkComponent tag 1
    ✔ Check LinkComponent tag 2
    ✔ Check LinkComponent props children
    ✔ Check LinkComponent props onclick
    ✔ Check Todo tag
    ✔ Check Todo props style 1
    ✔ Check Todo props children
    ✔ Check Todo props onClick
    ✔ Check Todo props style 2
    ✔ Check TodoList tag
    ✔ Check TodoList props children array
    ✔ Check Footer tag

  Todo Container Tests

    ✔ Check AddTodo text
    ✔ Check if filterLink's MapDispatchToProps returns onClick
    ✔ Check filterLink's MapDispatchToProps function
    ✔ Check getVisibleTodos default filter
    ✔ Check getVisibleTodos SHOW_ALL filter 1
    ✔ Check getVisibleTodos SHOW_ALL filter 2
    ✔ Check getVisibleTodos SHOW_COMPLETED filter 1
    ✔ Check getVisibleTodos SHOW_COMPLETED filter 2
    ✔ Check getVisibleTodos SHOW_ACTIVE filter 1
    ✔ Check getVisibleTodos SHOW_ACTIVE filter 2
    ✔ Check visibleTodoList text
    ✔ Check empty number of to do items
    ✔ Check number of to do items added
    ✔ Check value of item 1
    ✔ Check value of item 2
    ✔ Check if initial item has no text decoration
    ✔ Check if clicked item has text decoration

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement


  total:     75
  passing:   75
  duration:  7.7s


~~~

Run `npm run cover` in a terminal. The result should look like:
{: .padding-top}

~~~ bash


  Counter Actions Test

    ✔ Test increment action
    ✔ Test decrement action

  Todo Actions Test

    ✔ Test addTodo 1
    ✔ Test addTodo 2
    ✔ Test addTodo 3
    ✔ Test setVisibilityFilter
    ✔ Test toggleTodo

  Counter Presentation Tests

    ✔ Check Counter props
    ✔ Check Counter returns div

  Counter Tests

    ✔ Check getActions method
    ✔ Check mapStateToProps method
    ✔ Check mapDispatchToProps method

  Hello Test

    ✔ Check if Hello is a function
    ✔ Check is Hello returns correctly
    ✔ Check Hello returns div

  Counter Reducer Test

    ✔ Test increment
    ✔ Test decrement
    ✔ Test null state
    ✔ Test undefined state
    ✔ Test unknown action type
    ✔ Test missing action type

  Todo Reducer Test

    ✔ Test addTodo 1
    ✔ Test addTodo 2
    ✔ Test addTodo 3
    ✔ Test addTodo 4
    ✔ Test addTodo 5
    ✔ Test toggleTodo 1
    ✔ Test toggleTodo 2
    ✔ Test toggleTodo 3
    ✔ Test toggleTodo 4
    ✔ Test addTodo todoReducer 1
    ✔ Test addTodo todoReducer 2
    ✔ Test toggle todoReducer 1
    ✔ Test default todoReducer 1
    ✔ Test default todoReducer 2
    ✔ Test visibilityFilter 1
    ✔ Test visibilityFilter 2
    ✔ Test visibilityFilter 3

  Todo Presentation Tests

    ✔ Check LinkComponent props
    ✔ Check LinkComponent tag 1
    ✔ Check LinkComponent tag 2
    ✔ Check LinkComponent props children
    ✔ Check LinkComponent props onclick
    ✔ Check Todo tag
    ✔ Check Todo props style 1
    ✔ Check Todo props children
    ✔ Check Todo props onClick
    ✔ Check Todo props style 2
    ✔ Check TodoList tag
    ✔ Check TodoList props children array
    ✔ Check Footer tag

  Todo Container Tests

    ✔ Check AddTodo text
    ✔ Check if filterLink's MapDispatchToProps returns onClick
    ✔ Check filterLink's MapDispatchToProps function
    ✔ Check getVisibleTodos default filter
    ✔ Check getVisibleTodos SHOW_ALL filter 1
    ✔ Check getVisibleTodos SHOW_ALL filter 2
    ✔ Check getVisibleTodos SHOW_COMPLETED filter 1
    ✔ Check getVisibleTodos SHOW_COMPLETED filter 2
    ✔ Check getVisibleTodos SHOW_ACTIVE filter 1
    ✔ Check getVisibleTodos SHOW_ACTIVE filter 2
    ✔ Check visibleTodoList text
    ✔ Check empty number of to do items
    ✔ Check number of to do items added
    ✔ Check value of item 1
    ✔ Check value of item 2
    ✔ Check if initial item has no text decoration
    ✔ Check if clicked item has text decoration

  Test Routes

    ✔ Index page found
    ✔ Hello page found
    ✔ About page found
    ✔ 404 page found

  Test Store

    ✔ Check default store data
    ✔ Check store data
    ✔ Check hot module replacement
    -------------------------|----------|----------|----------|----------|----------------|
    File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
    -------------------------|----------|----------|----------|----------|----------------|
    All files                |      100 |      100 |      100 |      100 |                |
     src                     |      100 |      100 |      100 |      100 |                |
      rootReducer.ts         |      100 |      100 |      100 |      100 |                |
      store.ts               |      100 |      100 |      100 |      100 |                |
     src/components          |      100 |      100 |      100 |      100 |                |
      Counter.tsx            |      100 |      100 |      100 |      100 |                |
      Hello.tsx              |      100 |      100 |      100 |      100 |                |
      Todo.tsx               |      100 |      100 |      100 |      100 |                |
     src/components/actions  |      100 |      100 |      100 |      100 |                |
      counter.ts             |      100 |      100 |      100 |      100 |                |
      todo.ts                |      100 |      100 |      100 |      100 |                |
     src/components/reducers |      100 |      100 |      100 |      100 |                |
      counter.ts             |      100 |      100 |      100 |      100 |                |
      todo.ts                |      100 |      100 |      100 |      100 |                |
     src/layout              |      100 |      100 |      100 |      100 |                |
      index.tsx              |      100 |      100 |      100 |      100 |                |
     src/routes              |      100 |      100 |      100 |      100 |                |
      index.tsx              |      100 |      100 |      100 |      100 |                |
     src/views               |      100 |      100 |      100 |      100 |                |
      404.tsx                |      100 |      100 |      100 |      100 |                |
      about.tsx              |      100 |      100 |      100 |      100 |                |
      index.tsx              |      100 |      100 |      100 |      100 |                |
    -------------------------|----------|----------|----------|----------|----------------|
    =============================== Coverage summary ===============================
    Statements   : 100% ( 201/201 )
    Branches     : 100% ( 51/51 )
    Functions    : 100% ( 52/52 )
    Lines        : 100% ( 165/165 )
    ================================================================================


  total:     75
  passing:   75
  duration:  13.9s


~~~

Currently everything is in development mode. Let's finally modify `package.json`, `server.tsx` to run in production mode.
{: .padding-top}

To run in production, we will assume that everything will be first built and then run. There will be no need to use Hot Reloading and watch for changes.

Let's update `server.tsx` in the `src` directory:

#### src/server.tsx

~~~ javascript
import * as express from 'express';
import * as React from 'react';
import * as path from 'path';

import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import configureStore from './store';
import HtmlContainer from './layout/html';
import RouteContainer from './routes';

let Html = HtmlContainer;
let Route = RouteContainer;

const app = express();
const hostname = 'localhost';
const port = 8080;
const sitePort = 3000;

declare var __PRODUCTION__: Boolean; // Populated by webpack

function getMarkup(store: any, render_props: any) {
  const uri = __PRODUCTION__ ? 'assets' : `http://${hostname}:${sitePort}/client`;

  const component = (
    <Provider store = {store} key = "provider">
      <RouterContext {...render_props} />
    </Provider>
  );

  return '<!DOCTYPE html>' + renderToString(
      <Html
        component = {component}
        script = {`${uri}/index.js`}
        state = {store.getState()}
      />
    );
}
if (__PRODUCTION__) {
  app.use('/assets', express.static(path.join('_client')));
}

app.use(function (req: any, res: any) {
  match({
    location: req.url,
    routes: Route
  }, function (error, redirectionLocation, render_props) {
    if (error) {
      console.error('Router error:', error);

      res.status(500).send(error.message);
    } else if (redirectionLocation) {
      res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
    } else if (render_props) {
      const store = configureStore({});

      res.status(200).send(getMarkup(store, render_props));
    } else {
      res.status(400).send('Not Found');
    }
  });
});

declare const module: { hot: any };

app.listen(port, function (error: any) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> Open up http://${hostname}:${port}/ in your browser.`);
  }
});

if (module.hot) {
  console.info('[HMR] Server is listening…');

  module.hot.accept('./layout/html', function () {
    console.info('[HMR] Patching Html');

    Html = require('./layout/html').default;
  });

  module.hot.accept('./routes', function () {
    console.info('[HMR] Patching Route');

    Route = require('./routes').default;
  });
}

~~~

Let's update the `scripts` section `package.json`:
{: .padding-top}

#### package.json

~~~ json
{
  "name": "redux-typescript-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build-client-prod": "rm -rf _client && node_modules/.bin/webpack --verbose --colors --display-error-details --config webpack.config.client.js",
    "build-prod": "npm run build-client-prod && npm run build-server-prod",
    "build-server-prod": "rm -rf _server && node_modules/.bin/webpack --verbose --colors --display-error-details --config webpack.config.server.js",
    "cover": "node_modules/.bin/ts-node node_modules/.bin/istanbul cover -e .ts -e .tsx -x '*.test.ts{,x}' node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "dev": "node ./node_modules/.bin/concurrently --kill-others \"npm run watch-server\" \"npm run watch-client\" \"npm run dev-server\"",
    "dev-server": "node_modules/.bin/wait-run -p \"_server/index.js\" \"node ./_server\"",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint 'src/**/*.ts{,x}'",
    "postinstall": "npm run typings",
    "prod": "node ./_server",
    "test": "node_modules/.bin/ts-node node_modules/.bin/tape './**/*.test.ts{,x}' | node_modules/.bin/tap-spec",
    "watch-client": "node_modules/.bin/webpack-dev-server --config webpack.config.client.dev.js",
    "watch-server": "rm -rf _server && node_modules/.bin/webpack --colors --config webpack.config.server.dev.js",
    "typings": "node_modules/.bin/typings install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-register": "^6.11.6",
    "concurrently": "^2.2.0",
    "enzyme": "^2.4.1",
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
    "wait-run": "^1.2.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "express": "^4.14.0",
    "react": "^15.3.2",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "react-router-redux": "^4.0.6",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0"
  }
}

~~~

Let’s simulate a deployment:
{: .padding-top}
 - Stop any previous run
 - Build the package by running `npm run build-prod` which will create a `_client` and `_server` folder
 - Delete the `node_modules` and `typings` folders
 - Run `npm install --production` which will only install the `dependencies` section from the `package.json`
 - Run `npm run prod` and browse to `http://localhost:8080/`
{: .padding-top}

The site should work the same.

Some enhancements need to be made in order to have this production ready. I would add logging, express, cookie parser, express body parser etc and use environment variables to pass in data such as port numbers among other things.

You can view a similar example of this [here](https://github.com/melxx001/redux-starter/tree/7-add-todo){:target="_blank"}.
{: .padding-top}

{: .padding-bottom}



