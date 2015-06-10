---
layout: posts
postid: 2015-06-02-1
published: true
comments: false
showcommentcount: false
date: 2015-06-02
img: 
alt: Learning ES6
projectdate: June 2015
sitename: Learning ES6
theurl: 
category: Development
description: Coming Soon
title: Learning ES6
tags : [ES6, ES2015, learning]
---

 So I'm trying to use ES6 and keep up with the times. I want to get up to speed quickly so I figure the best way to learn this is to research and write about it. Also, I can have an area to quickly reference if I need to look something up. 

 I love posts with code examples and that what I've tried to add here. Message me or comment below if I've missed something or need to correct anything.


## Table of contents

{:toc .postpage-scroll}
+ TOC

## What is ES6?

ECMAScript 6 is the upcoming version of the ECMAScript standard, This interesting [site](http://kangax.github.io/compat-table/es6/){:target="_blank"} shows ES6 compatibility with current browsers, compilers and servers. If you have time to kill, you can also see the draft [ES2015 standard](https://people.mozilla.org/~jorendorff/es6-draft.html){:target="_blank"} for full specification of the ECMAScript 6 language.

There's a lot of cool stuff in ES6!

## Setup

I would suggest to try out the examples below using something like [jsbin](http://jsbin.com){:target="_blank"} or [codepen](http://codepen.io/pen/){:target="_blank"} with Babel set as the JavaScript preprocessor.

### Node.js

If you don't know node.js, you're missing out. See the [node.js site](https://nodejs.org/){:target="_blank"} for more information. It's suepr easy to setup.

Use the **--harmony** flag to be able to use ES6. And make sure you put **`"use strict"`** at the top of your file... otherwise, you'll get errors.

~~~ javascript
"use strict"
let test = 10
console.log(test)
~~~

~~~ bash
$ node --harmony app.js     # Based on the code above, this command outputs 10 to the terminal
~~~

### Browser 

To use client-side, you're going to need something that understands the ES6 language. [Babel](https://babeljs.io){:target="_blank"} does a pretty good job. 

> **IMPORTANT**: Compiling in the browser has a fairly limited use case, so if you are working on a production site, you should be **precompiling your scripts server-side**. See [setup build systems](http://babeljs.io/docs/setup/){:target="_blank"} for more information.

I was going to demonstrate how to include babel directly in the browser but decided against it after seeing that the file I downloaded at the time of writing this is over 85000 lines and 2.9 MB!!!!! The minified version itself is huge at is 1.8MB!! 

> Again... Precompile and bundle your code server-side during the build prior to serving it to your client. 

So that you don't spend your time figuring out what to do, I put together a very small example of transforming code using `gulp-babel` and `gulp`. This requires the [node](https://nodejs.org/){:target="_blank"} modules [gulp](http://gulpjs.com/){:target="_blank"} and [gulp-babel](https://www.npmjs.com/package/gulp-babel){:target="_blank"} to be installed prior.

#### Example Directory structure

~~~~ bash
|-- dist
  |-- app.js
|-- node_modules
  |-- gulp
  |-- gulp-babel
|-- src
  |-- app.js
|-- gulpfile.js
|-- package.json
~~~~

#### gulpfile.js

~~~ javascript
var gulp = require("gulp")
var babel = require("gulp-babel")

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
})
~~~

This will take the file app.js in the src directory, transform it using babel to a format current browsers will understand and put it in the dist folder.

#### app.js in src folder

~~~ javascript
'use strict'

let firstName = 'Bob'
let lastname = 'Smith'
let person = {
  firstName,
  lastname
}

let obj1 = (a, b) => ({foo: a + b})

let animal = 'lion'
let obj2 = {
  [ animal ]: 'name'
}
~~~

This file contains code with ES6 syntax.

#### Run it!

~~~ bash
$ gulp
[05:08:52] Using gulpfile ~/test/gulpfile.js
[05:08:52] Starting 'default'...
[05:08:52] Finished 'default' after 126 ms
~~~

Run `gulp` in a terminal to transform app.js in src directory using babel.

#### Resulting app.js in dist folder

~~~ javascript
'use strict';

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var firstNname = 'Bob';
var lastname = 'Smith';
var person = {
  firstNname: firstNname,
  lastname: lastname
};

var obj1 = function obj1(a, b) {
  return { foo: a + b };
};

var animal = 'lion';
var obj2 = _defineProperty({}, animal, 'name');
~~~

As you can see, it's been transformed to syntax that the current browsers will understand. You can now include this file on your page.

See [Gulp](http://gulpjs.com/){:target="_blank"} and [gulp-babel](https://babeljs.io/docs/setup/#gulp){:target="_blank"} for more information.

## Features

### Let and const

> The keywords `let` and `const` create new variables scoped to the nearest block of code that is denoted by curly braces `{` and `}`. 

> There is no hoisting because of the **temporal dead zone**. `This is the region of a program, where a variable or a parameter cannot be accessed until it’s initialized`. If you want to read more about this, check out [Temporal Dead Zone (TDZ) demystified](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/){:target="_blank"}.

> `const` is single-assignment. 

> Static restrictions prevent use before assignment.

~~~ javascript
num = '10';
let num;

console.log( num );   // undefined
~~~

Since there is no hoisting for let. In the example above, num is undefined.

~~~ javascript
if ( true ) {
  let num = '10';
}

console.log( num );   // ReferenceError: num is not defined     
~~~

In the above example, there is no identifier `num` outside that block scope, therefore calling an unknown identifier throws an error.

~~~ javascript
const animals = [ 'dog' ];
animals.push( 'cat' );

console.log( animals );   // [ "dog", "cat" ]
~~~

The keyword `const` creates a constant reference, not a constant value. You can push or remove values into the animals array above. But you will not be able to re-assign the variable.

~~~ javascript
const animals = [ 'dog' ];
animals.push( 'cat' );
animals.push( 'elephant' );

animals = [ 'lion' ];     // error because const is single-assignment
console.log( animals );
~~~

Nothing is displayed in the above example since it errors out because const only allows single-assignment.

[More let information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let){:target="_blank"} --
[More const information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const){:target="_blank"}.

### Default parameters

I really like this feature because it makes initializing arguments much easier.

~~~ javascript
function display( test1 = 'first', test2 = 'second' ){   // Super cool
  return test1 + ' -- ' + test2; 
}

console.log( display() );               // "first -- second"
console.log( display( '1', '2') );      // "1 -- 2"
~~~

Gone are the days where I have to continously check if a parameter has a value and set a default. You can give function arguments initial values in it's definition. 

The ES5 version would look like this:

~~~ javascript
function display( test1, test2 ) {
  var test1 = ( test1 === undefined ) ? 'first' : test1;    // Less cool
  var test2 = ( test2 === undefined ) ? 'second' : test2;

  return test1 + ' -- ' + test2;
}

console.log(display());             // "first -- second"
console.log(display('1', '2'));     // "1 -- 2"
~~~

### Template strings -- CONTINUE HERE

`
WRITE IN MY OWN WORDS: Template strings provide syntactic sugar for constructing strings. This is similar to string interpolation features in Perl, Python and more. Optionally, a tag can be added to allow the string construction to be customized, avoiding injection attacks or constructing higher level data structures from string contents.
`

You have to put tildes around expressions. Ex: `` `expression` ``

~~~ javascript
let one = 7, two = 1, three = 1;
let str = `${ one }, ${ two } and ${ three }`;

console.log( str );         // "7, 1 and 1"
~~~

~~~ javascript
let m = 38;

console.log(`{ m } badgers`);   // "{ m } badgers"
~~~
`{ m }` is not a valid substitution. The correct form is `${ m }`.

~~~ javascript
let message = `Hello, ${ firstName }`;

console.log( message );     // ReferenceError: firstName is not defined
~~~
The substitution `${firstName}` is replaced by the value of variable `firstName`, which is `undefined` in this case.

~~~ javascript
let userName = "guest";
let token = "123456";
let url = `http://www.example.com?userName=${ userName }&token=${ token }`;

console.log( url );   // "http://www.example.com?userName=guest&token=123456"
~~~
This is pretty cool!!

[More template strings information](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings){:target="_blank"}.

### Object literal

`
WRITE IN MY OWN WORDS: Object literals are extended to support setting the prototype at construction, shorthand for foo: foo assignments, defining methods, making super calls, and computing property names with expressions.
`

~~~ javascript
let firstName = 'Bob';
let lastName = 'Smith';

let person = {
  firstName,
  lastName
};

console.log( person );   // { firstName: "Bob", lastName: "Smith" }

/* ---------------- */

function createPerson( firstname, age, gender ) {
  return {
    name: firstname, age, gender
  };
}

let person = createPerson( 'Bob', 20, 'Male' );

console.log( person );     // { age: 20, gender: "Male", name: "Bob" }
~~~

Property keys can be initialized by variables of the same name. This is called “property name shorthand”.

~~~ javascript
function result() { return 'data'; };
let one = { result };

console.log( one );             // { result: function result() { return 'data'; } }
console.log( one.result() );    // "data"
~~~

The property `one` holds a reference to a function which makes that property a method.

~~~ javascript
let expr = {
  total() { return 'index'; }
};

console.log(expr);          // { total: function total() { return 'index'; } }
console.log(expr.total());  // "index"
~~~

Method name shorthand notation allows to omit the keyword `function` and colon `:`.

~~~ javascript
let animal = 'lion';
let obj = {
  [ animal ]: 'name'
};

console.log( obj );    // { lion: "name" }

/* ---------------- */

let suffix = 'Name';
let person = {
  [ 'first' + suffix ]: 'John',
  [ 'last' + suffix ]: 'Smith'
};

console.log( person );   // { firstName: "John", lastName: "Smith" }
~~~

Computed property names syntax allows you to put an expression in brackets `[]` which will be computed as the property name. 

~~~ javascript
let title = "title1";
let author = "author1";
let arr = [ { title, author } ];

title = "title2";
author = "author2";
arr.push( { title, author } );

arr.map( function ( { title, author } ) {
  console.log( title, 'is written by', author );     // title1 is written by author1
} );                                                 // title2 is written by author2
~~~

[More object literal information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer){:target="_blank"}.

### Arrows

Arrows are anonymous functions that are written with a shorter syntax and bind the `this` value.

~~~ javascript
function compute(){
  this.num1 = 0;
  this.num2 = 0;
    
    setInterval( () => {
      this.num1++;  // this refers to the compute object.
    }, 80 );

    setInterval( function() {
      this.num2 = 10 ;  // this refers to the window object. 
    }, 80 );
}

var number = new compute();

setTimeout( function() {
  console.log( number );        // { num1: 1, num2: 0 }
  console.log( window.num2 );   // 10
}, 100 );
~~~

Unlike functions, arrows share the same lexical `this` as their surrounding code.

~~~ javascript
let sum = ( a, b ) => a + b;
console.log( sum( 1,2 ) );  // 3

/* ---------------- */

let mult = ( a, b ) => {
  let multiplier = 2;
  return ( a + b ) * multiplier;  
};

console.log( mult( 1,2 ) );    // 6
~~~

~~~ javascript
let arr = [10, 20, 30];
arr.map( (a) => {
  console.log(a);      // 10, 20, 30
} );

/* ---------------- */

let name = 'bob';
let age = 20;
let data = {
  name,
  age
};

Object.keys(data).forEach( (o) => {
  console.log(data[o]);              // "bob", 20
}); 

/* ---------------- */

let obj = (a, b) => ({foo: a + b});
console.log(obj(1,2));              // { foo: 3 }
~~~

+ destructuring
+ default + rest + spread
+ iterators + for..of
+ generators
+ unicode
+ modules
+ module loaders
+ map + set + weakmap + weakset
+ proxies
+ symbols
+ subclassable built-ins
+ promises
+ math + number + string + array + object APIs
+ binary and octal literals
+ reflect api
+ tail calls
+ classes