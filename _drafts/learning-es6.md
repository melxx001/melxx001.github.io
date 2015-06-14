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

If you decide to use ES6 as part of your project, you're going to need to include a few things

### Server-side

If you don't know Node.js, you're missing out. See the [Node.js site](https://nodejs.org/){:target="_blank"} for more information. It's super easy to setup.

Use the `--harmony` flag to be able to use ES6. And make sure you put `"use strict"` at the top of your file... otherwise, you'll get errors.

~~~ javascript
"use strict"
let test = 10
console.log(test)
~~~

~~~ bash
$ node --harmony app.js     # Based on the code above, this command outputs 10 to the terminal
~~~

### Client-side 

You're going to need something to help browsers understand the ES6 language. [Babel](https://babeljs.io){:target="_blank"} does a pretty good job. 

> **IMPORTANT**: Compiling in the browser has a fairly limited use case, so if you are working on a production site, you should **precompile your scripts server-side**. See [setup build systems](http://babeljs.io/docs/setup/){:target="_blank"} for more information.

I was going to demonstrate how to include babel directly in the browser but decided against it after seeing that the file I downloaded at the time of this writing is over 85000 lines and 2.9 MB!!!!! The minified version itself is huge at 1.8MB!! 

> Again... Precompile and bundle your code server-side during the build prior to serving it to your client. 

### Compiling ES6 code to ES5 

To save you some time, I put together a very small example of transforming code using `gulp` and `gulp-babel`. This requires the [node](https://nodejs.org/){:target="_blank"} modules [gulp](http://gulpjs.com/){:target="_blank"} and [gulp-babel](https://www.npmjs.com/package/gulp-babel){:target="_blank"}.

#### Starting Directory structure

~~~~ bash
|-- node_modules
  |-- gulp
  |-- gulp-babel
|-- src
  |-- app.js
|-- gulpfile.js
|-- package.json
~~~~

#### gulpfile.js

This will take the file `app.js` in the `src` directory, transform it using babel to a format current browsers will understand and put it in the `dest` folder.

~~~ javascript
var gulp = require("gulp")
var babel = require("gulp-babel")

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dest"))
})
~~~

#### app.js in src folder

This file contains code with ES6 syntax.

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

#### Run it!

Run `gulp` in a terminal to transform `app.js` in the `src` directory using babel.

~~~ bash
$ gulp
[05:08:52] Using gulpfile ~/test/gulpfile.js
[05:08:52] Starting 'default'...
[05:08:52] Finished 'default' after 126 ms
~~~

#### Ending Directory structure

The `dest` folder has been created containing `app.js` with the equivalent ES5 code

~~~~ bash
|-- dest
  |-- app.js
|-- node_modules
  |-- gulp
  |-- gulp-babel
|-- src
  |-- app.js
|-- gulpfile.js
|-- package.json
~~~~

#### Resulting app.js in dest folder

As you can see, it's been transformed to syntax that the current browsers will understand. You can now include this file on your page.

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

## Features

This is **not** a complete list of features. Some of things I didn't mention and even the feature themselves might not have every scenario.

### Let and const

+ Both the keywords `let` and `const` create new variables scoped to the nearest block of code that is denoted by curly braces `{` and `}`
+ Static restrictions prevent their use before assignment
+ `const` is single-assignment
+ There is no hoisting because of the **temporal dead zone**. `This is the region of a program, where a variable or a parameter cannot be accessed until it’s initialized`. If you want to read more about this, check out [Temporal Dead Zone (TDZ) demystified ](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/){:target="_blank"}

#### Let
~~~ javascript
num = '10';
let num;

console.log( num );   // undefined Since there is no hoisting for let
~~~

~~~ javascript
if ( true ) {
  let num = '10';
}

console.log( num );   // ReferenceError: num is not defined since it's outside the block scope
~~~

[More let information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let){:target="_blank"}

#### const

The keyword `const` creates a constant reference, not a constant value. You can push or remove values into the animals array above. But you will not be able to re-assign the variable.

~~~ javascript
const animals = [ 'dog' ];
animals.push( 'cat' );

console.log( animals );   // [ "dog", "cat" ]
~~~

~~~ javascript
const animals = [ 'dog' ];
animals.push( 'cat' );
animals.push( 'elephant' );

animals = [ 'lion' ];     // error because const is single-assignment
~~~

[More const information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const){:target="_blank"}.

### Spread Operator

A cool feature is the spread operator. It simplifies things where multiple arguments need to be used.

~~~ javascript
let animals = [ 'cat', 'dog' ];
let moreAnimals = [ 'elephant', ...animals, 'lion' ];

console.log( moreAnimals );  // ["elephant", "cat", "dog", "lion"]
~~~

~~~ javascript
function name( first , last){
  return first + ' ' + last;
}

let user = [ 'Bob', 'Smith' ];

console.log( name( ...user ) );  // "Bob Smith"
~~~

### Default parameters

I really like this feature because it makes initializing arguments much easier. Gone are the days where I have to continuously check if a parameter has a value and set a default. You can give function arguments initial values in it's definition. 

~~~ javascript
function display( test1 = 'first', test2 = 'second' ){   // Super awesome
  return test1 + ' -- ' + test2; 
}

console.log( display() );               // "first -- second"
console.log( display( '1', '2') );      // "1 -- 2"
~~~

The ES5 version would look like this:
{: .padding-top}

~~~ javascript
function display( test1, test2 ) {
  var test1 = ( test1 === undefined ) ? 'first' : test1;    // Less awesome
  var test2 = ( test2 === undefined ) ? 'second' : test2;

  return test1 + ' -- ' + test2;
}

console.log(display());             // "first -- second"
console.log(display('1', '2'));     // "1 -- 2"
~~~

### Template strings

This is another cool way of constructing strings. You have to put tildes around expressions and use `$`. Ex: `` `${ expression }` ``

~~~ javascript
let one = 7, two = 1, three = 1;
let str = `${ one }, ${ two } and ${ three }`;

console.log( str );         // "7, 1 and 1"
~~~

~~~ javascript
let userName = "guest";
let token = "123456";
let url = `http://www.example.com?userName=${ userName }&token=${ token }`;

console.log( url );   // "http://www.example.com?userName=guest&token=123456"
~~~

~~~ javascript
let one = 7, two = 1, three = 1;

console.log( `${ one + two + three } and ${ one - two - three }` );         // "9 and 5"
~~~

This is pretty cool!!
{: .padding-bottom}

~~~ javascript
let m = 38;

console.log(`{ m } badgers`);   // "{ m } badgers"
~~~

`{ m }` is not a valid substitution. The correct form is `${ m }`.
{: .padding-bottom}

~~~ javascript
let message = `Hello, ${ firstName }`;

console.log( message );     // ReferenceError: firstName is not defined
~~~

The substitution `${firstName}` is replaced by the value of variable `firstName`, which in this case is `undefined`.
{: .padding-bottom}

[More template strings information](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings){:target="_blank"}.

### Object initializer (or literal)

Creating objects has a new notations in ES6. I'm definitely going to use this!

Property keys can be initialized by variables of the same name. This is called “property name shorthand”.
{: .padding-top}

~~~ javascript
let firstName = 'Bob';
let lastName = 'Smith';

let person = {
  firstName,
  lastName
};

console.log( person );   // { firstName: "Bob", lastName: "Smith" }
~~~

~~~ javascript
function createPerson( firstname, age, gender ) {
  return {
    name: firstname, age, gender
  };
}

let person = createPerson( 'Bob', 20, 'Male' );

console.log( person );     // { age: 20, gender: "Male", name: "Bob" }
~~~

In the example below, the property `one` holds a reference to a function which makes that property a method.
{: .padding-top}

~~~ javascript
function result() { return 'data'; };
let one = { result };

console.log( one );             // { result: function result() { return 'data'; } }
console.log( one.result() );    // "data"
~~~

Method name shorthand notation allows to omit the keyword `function` and colon `:`.
{: .padding-top}

~~~ javascript
let expr = {
  total() { return 'index'; }
};

console.log( expr );          // { total: function total() { return 'index'; } }
console.log( expr.total() );  // "index"
~~~

Computed property names syntax allows you to put an expression in brackets `[]` which will be computed as the property name. 
{: .padding-top}

~~~ javascript
let animal = 'lion';
let obj = {
  [ animal ]: 'name'
};

console.log( obj );    // { lion: "name" }
~~~ 

~~~ javascript
let suffix = 'Name';
let person = {
  [ 'first' + suffix ]: 'John',
  [ 'last' + suffix ]: 'Smith'
};

console.log( person );   // { firstName: "John", lastName: "Smith" }
~~~

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

Unlike functions, arrows share the same lexical `this` as their surrounding code.
{: .padding-top}

~~~ javascript
function compute(){
  this.num1 = 0;
  this.num2 = 0;
    
    setInterval( () => {
      this.num1++;  // this refers to the computed object.
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

~~~ javascript
let sum = ( a, b ) => a + b;
console.log( sum( 1, 2 ) );  // 3
~~~

~~~ javascript
let mult = ( a, b ) => {
  let multiplier = 2;
  return ( a + b ) * multiplier;  
};

console.log( mult( 1, 2 ) );    // 6
~~~

~~~ javascript
let arr = [10, 20, 30];
arr.map( ( a ) => {
  console.log( a );      // 10, 20, 30
} );
~~~

~~~ javascript
let name = 'bob';
let age = 20;
let data = {
  name,
  age
};

Object.keys( data ).forEach( ( value ) => {
  console.log( data[ value ]);              // "bob", 20
});
~~~

~~~ javascript
let obj = ( a, b ) => ( { foo: a + b } );
console.log( obj( 1, 2 ) );              // { foo: 3 }
~~~

[More arrows information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions){:target="_blank"}.


### Destructuring

This is another feature that's really neat. It's super simple and enables you to read a whole structure in one line!! I'm itching at opportunities to include this stuff in my future code.

#### Object destructuring

Let's create variables from an existing object.
{: .padding-top}

~~~ javascript
let obj = { first: 'Bob', last: 'Smith', age: 22 };
let { first, age } = obj;    // Variable names must match the properties of the object

console.log( first );   // "Bob"
console.log( age );     // 22
~~~

> It's important to note that variable names **must match** the property names of the object. If you do something like `let { firstname, age } = obj;` in the above example, `firstname` would be `undefined`.
>
> You don't need to use all the properties in the object. Notice that I didn't use the `last` property of `obj`. 

We can easily use our own variable names. Let's take the above example and change it to use different variables names.
{: .padding-top}

~~~ javascript
let obj = { first: 'Bob', last: 'Smith', age: 22 };
let { first: firstName , age: userAge } = obj;

console.log( firstName );   // "Bob"
console.log( userAge );     // 22
~~~

~~~ javascript
function user( { first: firstName , last: lastName } ){
  return firstName + ' ' + lastName;
}

console.log( user( { first: 'Bob', last: 'Smith' } ) ); // "Bob Smith"
~~~

Destructuring assignment can be made without a declaration in the assignment statement. The statement must be wrapped in parentheses.
{: .padding-top}

~~~ javascript
let name, age;
( { name, age } = { name: "Bob" , age: 22 } ); // You need to wrap this statement in parentheses

console.log( name );   // "Bob"
console.log( age );    // 22
~~~

#### Array destructuring

Let's create variables from an existing array.
{: .padding-top}

~~~ javascript
let arr = ['Bob', 'Smith', 22 ];
let [ first, last, age ] = arr;

console.log( first );   // "Bob"
console.log( age );     // 22
~~~

The amount of elements in the destructured statement must match the original array to correctly capture the data you want. In the example below, you'll notice `let [ first, , age, , telephone ] = arr;` which looks like we're missing variables but it's not the case. We've purposefully ignored some values.
{: .padding-top}

~~~ javascript
let arr = ['Bob', 'Smith', 22 , '1234 Main St', '555-555-5555'];
let [ first, , age, , telephone ] = arr;  // Purposefully only included 3 variables

console.log( first );     // "Bob"
console.log( age );       // 22
console.log( telephone ); // 555-555-5555
~~~

Another cool feature is swapping variables without using temporary variables.
{: .padding-top}

~~~ javascript
let name1 = 'Bob';
let name2 = 'Jack';

console.log( name1 );   // "Bob"
console.log( name2 );   // "Jack"

[ name1, name2 ] = [ name2 , name1 ]    // Awesome!

console.log( name1 );   // "Jack"
console.log( name2 );   // "Bob"

[ name1, name2 ] = [ name1 + ' Smith' , name1 + ' ' + name2 ]    // Awesome!

console.log( name1 );   // "Jack Smith"
console.log( name2 );   // "Jack Bob"
~~~

[More destructuring information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment){:target="_blank"}.

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
{: .hidden}