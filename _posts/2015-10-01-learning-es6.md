---
layout: post
postid: 2015-10-01-learning-es6
published: true
comments: true
showcommentcount: true
date: 2015-10-01
img: learning-es6.png
alt: Learning ES6
projectdate: October 2015
sitename: Learning ES6
theurl: 
category: Development
description: ES6 Reference
title: Learning ES6
tags : [ES6, ES2015, learning]
---

 So I'm trying to use ES6 and keep up with the times. I want to get up to speed quickly so I figure the best way to learn this is to research and write about it. Also, I can have an area to quickly reference if I need to look something up. 

 I love posts with code examples and that what I've tried to add here. Message me or comment below if I've missed something or need to correct anything.


## Table of contents

{:toc .postpage-scroll}
+ TOC

## What is ES6?

ECMAScript 6 is the newest version of the ECMAScript standard. It is the 2015 update to the JavaScript language and is refered to as ES6 or ES2015.

To see ES6's compatibility with current browsers, compilers and servers, you can find a table at this [site](http://kangax.github.io/compat-table/es6/){:target="_blank"}. If you have time to kill, you can also see the draft [ES2015 standard](https://people.mozilla.org/~jorendorff/es6-draft.html){:target="_blank"} for full specification of the ECMAScript 6 language.

There's a lot of cool stuff in ES6!

## Setup

I would suggest to try out the examples below in Chrome since it seems that most features are available using something like [jsbin](http://jsbin.com){:target="_blank"} or [codepen](http://codepen.io/pen/){:target="_blank"} with Babel set as the JavaScript preprocessor. 

If you decide to use ES6 as part of your project, you're going to need to include a few things

### Node.js & Babel

If you don't know about Node.js, you're missing out. See the [Node.js site](https://nodejs.org/){:target="_blank"} for more information. It's super easy to setup and fun to use.

You're going to need something to help browsers understand the ES6 language. [Babel](https://babeljs.io){:target="_blank"} does a pretty good job. 

> **IMPORTANT**: Compiling in the browser directly has a fairly limited use case, so if you are working on a production site, you should **precompile your scripts server-side**. See [setup build systems](http://babeljs.io/docs/setup/){:target="_blank"} for more information.

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

var firstName = 'Bob';
var lastname = 'Smith';
var person = {
  firstName: firstName,
  lastname: lastname
};

var obj1 = function obj1(a, b) {
  return { foo: a + b };
};

var animal = 'lion';
var obj2 = _defineProperty({}, animal, 'name');
~~~

## Features

This is **not** a complete list of features. The features themselves will not have every scenario but I think there's a good amount to understand what's going on.

### Let and const

+ Both the keywords `let` and `const` create new variables scoped to the nearest block of code that is denoted by curly braces `{` and `}`
+ Static restrictions prevent their use before assignment
+ `const` is single-assignment
+ There is no hoisting because of the **temporal dead zone**. `This is the region of a program, where a variable or a parameter cannot be accessed until it’s initialized`. If you want to read more about this, check out [Temporal Dead Zone (TDZ) demystified ](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/){:target="_blank"}

#### Let

~~~ javascript
let num = '10';
console.log( num );   // 10
~~~

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

[More let information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let){:target="_blank"}.
{: .padding-top}

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
{: .padding-top}

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

>  **Note**: This only applies if the parameter is `undefined` and **not** when the parameter's value is `null`. 

~~~ javascript
function display( test1 = 'first', test2 = 'second' ){   // Super awesome
  return test1 + ' -- ' + test2; 
}

console.log( display() );               // "first -- second"
console.log( display(null,null) );      // "null -- second" 
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

This is another cool way of constructing strings. You have to put back ticks around expressions and use `$`. Ex: `` `${ expression }` ``

~~~ javascript
let one = 7, two = 1, three = 1;
let str = `${one}, ${two} and ${three}`;

console.log( str );         // "7, 1 and 1"
~~~

~~~ javascript
let userName = "guest";
let token = "123456";
let url = `http://www.example.com?userName=${userName}&token=${token}`;

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

console.log(`{m} badgers`);   // "{m} badgers"
~~~

`{ m }` is not a valid substitution. The correct form is `${ m }`.
{: .padding-bottom}

~~~ javascript
let message = `Hello, ${firstName}`;

console.log( message );     // ReferenceError: firstName is not defined
~~~

The substitution `${firstName}` is replaced by the value of variable `firstName`, which in this case is `undefined`.

[More template strings information](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings){:target="_blank"}.
{: .padding-top}

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

Method name shorthand notation allows omitting the keyword `function` and colon `:`.
{: .padding-top}

~~~ javascript
let expr = {
  index() { return 'index'; },
  sum( a, b ) { return a + b; }
};

console.log( expr.index() );        // "index"
console.log( expr.sum( 1, 2 ) );    // 3
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
{: .padding-top}

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
{: .padding-top}

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
{: .padding-top}

### Symbols

A symbol is a unique and immutable data type. I don't believe I'll be making lot of use of this but it can be used as unique ids.
{: .padding-top}

~~~ javascript
let str = 'this is a symbol';
let symbol1  = Symbol(str);
let symbol2  = Symbol(str);

console.log( typeof symbol1 );       // "symbol"
console.log( symbol1 === symbol2 );  // false because symbols are unique
console.log( symbol1 == symbol2 );   // false because symbols are unique
~~~

Let's look at a few examples:
{: .padding-top}

~~~ javascript
const username = Symbol();

let user = {
    name: "Bob Smith",
    [ username ]: "bob",  // This property is a symbol
    username: "new-bob"   // This property is a string
};

console.log( user );             // { name: "Bob Smith", username: "new-bob", Symbol(): "bob" }
console.log( user[ username ] ); // "bob"
console.log( user.username );    // "new-bob"
~~~

~~~ javascript
const username = Symbol();

let user = {
    name: "Bob Smith",
    [ username ]: "bob"
};

user[ username ] = "changed-bob";

console.log( user );              // { name: "Bob Smith", Symbol(): "changed-bob" }
console.log( user[ username ] );  // "changed-bob"
~~~

Interestingly, if you change the value of initial symbol used, you lose the reference to it. That's because symbols are unique.
{: .padding-top}

~~~ javascript
let username = Symbol();

let user = {
    name: "Bob Smith",
    [ username ]: "bob"
};

username = Symbol();  // This symbol is different from the first declaration

console.log( user[ username ] );  // undefined
~~~

Another thing I noticed is that you will not get symbols when you iterate through the object's properties.
{: .padding-top}

~~~ javascript
const username = Symbol();

let user = {
    firstName: "Bob",
    lastName: "Smith",
    age: 22,
    [ username ]: "bob"
};

console.log( Object.getOwnPropertyNames( user ) );  // ["firstName", "lastName", "age"] 
~~~

To get the object's symbols, you can use Object.getOwnPropertySymbols which will return an array of symbols
{: .padding-top}

~~~ javascript
const username = Symbol();

let user = {
    name: "Bob Smith",
    [ username ]: "bob"
};

console.log( Object.getOwnPropertySymbols( user ) );              // [ Symbol() ]
console.log( user[ Object.getOwnPropertySymbols( user )[0] ] );   // "bob"  
~~~

[More symbols information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol){:target="_blank"}.
{: .padding-top}

### Iterators

#### Iterators
{: .padding-bottom}

##### Definitions

> An Iterable is an object that returns an iterator. It has a `[Symbol.iterator]()` method inside.

> An iterator is simply an object with a `next()` method that returns an object with property `value` containing the current value and the property `done` which shows whether we're done iterating.

~~~ javascript
let arr = [ 1 , 2 ];
let iterator = arr[Symbol.iterator]();

console.log(iterator.next());   // { done: false, value: 1 }
console.log(iterator.next());   // { done: false, value: 2 }
console.log(iterator.next());   // { done: true, value: undefined }
~~~

[More Iterators information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols){:target="_blank"}.
{: .padding-top}

##### for-of
{: .padding-top}

The `for-of` loop iterates over iterable object such as arrays, maps, sets, argument objects etc.

~~~ javascript
let arr = [ 1 , 2 ];

for( let a of arr ){
  console.log( a );     // 1 , 2
}
~~~

The `for-of` loop differs from the `for-in` loop which iterated over names.
{: .padding-top}

~~~ javascript
let arr = [ 1 , 2 ];
arr.extraNumber = 10

for( let a in arr ){
  console.log( a );     // "0" , "1", "extraNumber"
}
~~~

[More for-of information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of){:target="_blank"}.
{: .padding-top}

### Generators

Generators are useful for creating custom iterators and doing asynchronous JavaScript. 

##### Definitions
{: .padding-top}

> The `function*` defines a generator function and returns a generator object. It's a function, that can be paused many times, and resumed later, allowing other code to run during these paused periods.
> [More function* information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*){:target="_blank"}.

> A generator is a special function that works as a factory for iterators. It produces a sequence of results instead of a single value.
> [More generator information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator){:target="_blank"}.

> The yield keyword is used to pause and resume a generator function. 
> [More yield information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield){:target="_blank"}.

> The yield* expression is used to delegate to another generator or iterable object. 
> [More yield* information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*){:target="_blank"}.

##### Examples
{: .padding-top}

> **Important**: At the time of this writing, I couldn't get the generator examples below to work in jsbin using the ES6/Babel preprocessor. 
> 
> I had to switch it to JavaScript and used the Chrome browser. You could paste these example in the Chrome console too.

In the example below, the generator function is resumed only when we call the `next()` method.

~~~ javascript
var shield = function* (){
  yield 'Thor';
  yield 'Iron Man';
  yield 'Captain America';
  yield 'Hulk';
}

var avengers = shield();

console.log( avengers.next() );   // { value: "Thor", done: false }
console.log( avengers.next() );   // { value: "Iron Man", done: false }
console.log( avengers.next() );   // { value: "Captain America", done: false }
console.log( avengers.next() );   // { value: "Hulk", done: false }
console.log( avengers.next() );   // { value: undefined, done: true }
~~~

~~~ javascript
function* groceries (grocery){
  for( var item of grocery.split( ' ' ) ){
    yield item;
  }
}

var list = groceries( 'cabbage meat oranges turkey yogurt' );

for ( var word of list ){
  console.log( word );    // "cabbage"
}                         // "meat"
                          // "oranges"
                          // "turkey"
                          // "yogurt"
~~~

~~~ javascript
function* marvel(){
  yield 'Captain America';
  yield 'Iron Man';
  yield* hydra();     // This will bring the values from the hydra generator function
}

function* hydra(){
  yield 'Red Skull';
  yield 'Arnim Zola';
}

var characters = marvel();

console.log( characters.next() );   // { value: "Captain America", done: false }
console.log( characters.next() );   // { value: "Iron Man", done: false }
console.log( characters.next() );   // { value: "Red Skull", done: false }
console.log( characters.next() );   // { value: "Arnim Zola", done: false }
console.log( characters.next() );   // { value: undefined, done: true }
~~~

[More iterators and Generators information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators){:target="_blank"}.
{: .padding-top}

### Collections

#### Set

The `Set` object lets you store unique values of any type. 
{: .padding-top}

Use the `has` method checks if an item exists or not. The property `size` returns the size of the `Set`.
{: .padding-top}

~~~ javascript
let cards = new Set();

cards.add( 10 );
cards.add( 'jack' );
cards.add( 'queen' );
cards.add( 'king' );
cards.add( [ 6, 7, 8, 9 ] );
cards.add( { four: 4 } );


console.log( cards );               // { 10, "jack", "queen", "king", [6, 7, 8, 9], { four: 4 } }
console.log( cards.size );          // 6
console.log( cards.has('ace') );    // false
console.log( cards.has(10) );       // true
console.log( cards.has('king') );   // true
~~~

Use the `delete()` method to remove an item from the `Set`
{: .padding-top}

~~~ javascript
let cards = new Set();

cards.add( 10 );
cards.add( 'jack' );
cards.add( 'queen' );
cards.add( 'king' );

console.log( cards );               // { 10, "jack", "queen", "king" }
console.log( cards.size );          // 4

cards.delete( 10 );

console.log( cards );               // { "jack", "queen", "king" }
console.log( cards.size );          // 3
~~~

There are no duplicates in a `Set` since each entry is unique
{: .padding-top}

~~~ javascript
let cards = new Set( [ 10, 10, 'jack', 'king' ] );

cards.add( 10 );
cards.add( 10 );
cards.add( 'jack' );
cards.add( 'jack' );
cards.add( 'queen' );
cards.add( 'queen' );
cards.add( 'king' );
cards.add( 'king' );

console.log( cards );               // { 10, "jack", "queen", "king" }
console.log( cards.size );          // 4
~~~

Use the `clear()` method to empty the `Set`
{: .padding-top}

~~~ javascript
let cards = new Set( [ 10, 'jack', 'queen', 'king' ] );

console.log( cards );               // { 10, "jack", "queen", "king" }
console.log( cards.size );          // 4

cards.clear();

console.log( cards );               // { }
console.log( cards.size );          // 0
~~~

You can use the `for-of` loop to iterate over the `Set`
{: .padding-top}

~~~ javascript
let cards = new Set( [ 10, 'jack' ] );

for ( let card of cards ){
  console.log( card );  // 10
}                       // "jack"
~~~

[More set information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set){:target="_blank"}.
{: .padding-top}

#### Map

The `Map` object is a simple key/value map. Any value can be used as either a key or a value.
{: .padding-top}

Use the `has` method checks if an item exists or not. The `get` returns the value of a key.
{: .padding-top}

~~~ javascript
let cards = new Map();

cards.set( 10, 'ten' );
cards.set( 11, 'jack' );
cards.set( 12, 'queen' );
cards.set( 13, 'king' );

console.log( cards );               // { 10 => "ten", 11 => "jack", 12 => "queen", 13 => "king" }
console.log( cards.size );          // 4
console.log( cards.has('ace') );    // false
console.log( cards.has('king') );   // false
console.log( cards.get(10) );       // "ten"
console.log( cards.get(13) );       // "king"
~~~

Use the `delete()` method to remove an item from the `Map`
{: .padding-top}

~~~ javascript
let cards = new Map([ [ 10, 'ten' ], [ 11, 'jack' ], [ 12, 'queen' ], [ 13, 'king' ] ]);

console.log( cards );               // { 10 => "ten", 11 => "jack", 12 => "queen", 13 => "king" }
console.log( cards.size );          // 4

cards.delete( 13 );

console.log( cards );               // { 10 => "ten", 11 => "jack", 12 => "queen" }
console.log( cards.size );          // 3
~~~

Use the `clear()` method to empty the `Map`
{: .padding-top}

~~~ javascript
let cards = new Map([ [ 10, 'ten' ], [ 11, 'jack' ], [ 12, 'queen' ], [ 13, 'king' ] ]);

console.log( cards );               // { 10 => "ten", 11 => "jack", 12 => "queen", 13 => "king" }
console.log( cards.size );          // 4

cards.clear();

console.log( cards );               // { }
console.log( cards.size );          // 0
~~~

The `values()` method return an iterator of `Map` values. The `keys()` method return an iterator of `Map` keys. Let's use the `for-of` loop to iterate over the `Map`. 
{: .padding-top}

~~~ javascript
let cards = new Map([ [ 10, 'ten' ], [ 11, 'jack' ], [ 12, 'queen' ], [ 13, 'king' ] ]);

for( let card of cards ){
  console.log( card );    // [ 10, "ten" ]
}                         // [ 11, "jack" ]
                          // [ 12, "queen" ]
                          // [ 13, "king" ]

for( let card of cards.values() ){
  console.log( card );    // "ten"
}                         // "jack"
                          // "queen"
                          // "king"

for( let card of cards.keys() ){
  console.log( card );    // 10
}                         // 11
                          // 12
                          // 13
~~~

[More map information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map){:target="_blank"}.
{: .padding-top}

#### WeakSet

Differently from a `Set`, `Weakset` only stores objects and not arbitrary values. Also, `WeakSet` is not enumerable. 

Other than information purpose, I don't see a big use of this. It doesn't provide any methods or functions to manipulate its contents. From what I read, the only benefit is that `Set` can cause more garbage in memory than 'WeakSet' since references to objects in the collection are held "weakly". If there is no other reference to an object stored in the WeakSet, it can be garbage collected.
{: .padding-top}

~~~ javascript
let cards = new WeakSet();
let arr = [ 6, 7, 8, 9 ];
let obj = { four: 4 };

cards.add( arr );
cards.add( obj );

console.log( cards );               // { [6, 7, 8, 9], { four: 4 } }
console.log( cards.has(arr) );      // true
console.log( cards.has(obj) );      // true
~~~

I would've thought in the example below that `arr` would be found in `cards` and the array removed. But for the `delete` and `has` to work as I thought, I would have to add `arr` via `card.add( arr )`.
{: .padding-top}
~~~ javascript
let cards = new WeakSet( [ [ 6, 7, 8, 9 ], { four: 4 } ] );
let arr = [ 6, 7, 8, 9 ];

console.log( cards.has(arr) );      // false
cards.delete(arr);
console.log( cards );               // { [ 6, 7, 8, 9 ], { four: 4 } }
~~~

[More weakset information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet){:target="_blank"}.
{: .padding-top}

#### WeakMap

Like `WeakSet`, I don't see a big use for `WeakMap` in anything I'm doing. It only allows object keys, doesn't have a size method and cannot be iterated over.
{: .padding-top}

~~~ javascript
let cards = new WeakMap();
let jack = { amount: 11 };
let queen = { amount: 12 };

cards.set( jack, 'jack' );
cards.set( queen, 'queen' );

console.log( cards );               // { {amount: 11} => "jack", {amount: 12} => "queen" }
console.log( cards.has(jack) );     // true
console.log( cards.get(jack) );     // "jack"
console.log( cards.get(queen) );    // "queen"
~~~

Interestingly, `cards.has({ amount: 11 })` in the example below returns `false`.
{: .padding-top}

~~~ javascript
let cards = new WeakMap();
let jack = { amount: 11 };

cards.set( jack, 'jack' );

console.log( cards );                         // { { amount: 11 } => "jack" }
console.log( cards.has(jack) );               // true
console.log( cards.has({ amount: 11 }) );     // false
console.log( cards.delete({ amount: 11 }) );  // Doesn't find { amount: 11 } to delete
~~~


[More weakmap information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap){:target="_blank"}.
{: .padding-top}


### Proxy

The `Proxy` object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc). You can intercept calls made to regular objects and it is designed to work "transparently". 

> At the time of this writing, only Firefox has support for this. So if you're testing this out in jsbin, try the next set of examples in Firefox.

> The proxy syntax is `var proxy = new Proxy(target , handler)`. `target` can be an object, array, function or another proxy. `handler` is an object containing methods to alter the behavior of an operation.

#### Operations

Below is a list of operations that can be intercepted.


> Operation  ||| Handler
------------- ||| -------------
proxy[name]  ||| handler.get(proxy, name)
proxy[name] = val  ||| handler.set(proxy, name, val)
name in proxy  ||| handler.has(name)
delete proxy[name]  ||| handler.delete(name)
for (var name in proxy) {...}  ||| handler.iterate()
Object.keys(proxy)  ||| handler.keys()

#### Methods that can be intercepted

Below are methods that can be intercepted by the `Proxy`.

+ get
+ set
+ keys
+ enumerate
+ apply
+ has
+ construct
+ getOwnPropertyNames
+ defineProperty
+ deleteProperty
+ getOwnPropertyDescriptor
+ freeze
+ seal
+ preventExtensions
+ isFrozen
+ isExtensible
+ isSealed
+ hasOwn
+ getPrototypeOf

#### Examples

Let's intercept the `get` operation of an object.
{: .padding-top}

~~~ javascript
let handler = {
  get: function( target, key ){

    // if the property doesn't exist, this will return "Random Object"
    // instead of undefined
    if( !target[ key ] ){
      target[ key ] = 'Random Object';
    }               

    return target[ key ]; 
  }
};

let target = {
  protection: 'shield',
  weapon: 'sword'
};

let items = new Proxy( target, handler );

console.log( items.weapon );      // "sword"
console.log( items.protection );  // "shield"
console.log( items.hammer );      // "Random Object"
console.log( items.armor );       // "Random Object"
~~~

Let's intercept the `set` operation of an object.
{: .padding-top}

~~~ javascript
let handler = {
  set: function( obj, prop, value ){

    // Set to uppercase when the property is "category"
    if( prop === 'category' ){
      value = value.toUpperCase();
    }

    // Check if the value of the property "amount"
    // is a number and less than 500. Otherwise, display some warnings
    if( prop === 'amount' ){
      let val = parseFloat( value );
      if( isNaN( val ) ){
        console.warn( value + ' is not a number.' );
        val = 0;
      }

      if (val > 500) {
        console.warn( 'Limit of $500.00 exceeded.' );
      }

      value = '$' + val.toFixed(2);
    }

    obj[ prop ] = value;
  }
};

let expense = new Proxy( {}, handler );

expense.category = 'groceries';
expense.amount = '340';

console.log( expense );   // { amount: "$340.00", category: "GROCERIES" }

expense.amount = 'zzz';   // "zzz is not a number."
expense.amount = '540';   // "Limit of $500.00 exceeded."
~~~

Let's proxy an array.
{: .padding-top}

~~~ javascript
let cardHandler = {
  get: function( target, key ){

    // In an array, this function will receive the length property
    // If found, we'll just exit.
    if( key === 'length'){
      return target[ key ];
    }

    let cards = new Map([
      ['jack',  11],
      ['queen', 12],
      ['king',  13],
      ['ace',   14]
    ]);
 
    let currentCard = target[ key ].toLowerCase();

    // Let's find the current card in the Map
    if(cards.has(currentCard)){
      return cards.get(currentCard);
    }

    return parseInt( target[ key ] ); 
  }
};

let deck = [ "8", "9", "10", "jack", "king", "queen", "ace" ];

let cardValues = new Proxy( deck, cardHandler );

console.log( cardValues );      // [8, 9, 10, 11, 13, 12, 14]
~~~

Let's proxy a function. In the example below, we want to subtract the lower value from the highest.
{: .padding-top}

~~~ javascript
function subtraction(a, b) {
  return a - b; 
}

let subtractionHandler = {
  apply: function apply( target, scope, args ) {

    let [ a , b ] = args;

    // Subtract the lower value from the highest
    if ( b > a ){
      return target.apply( scope, [ b, a ] );
    }

    return target.apply( scope, args );
  }
};

let customSubtract = new Proxy(subtraction, subtractionHandler);
console.log(customSubtract(10, 5));   // 5
console.log(customSubtract(5, 10));   // 5
~~~

[More proxy information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy){:target="_blank"}.
{: .padding-top}

### Promises

Used for async operations, a `Promise` can be in the following states:
{: .padding-top}

+ pending: The operation has not completed and is not rejected.
+ fulfilled: The operation is successful
+ rejected: The operation failed.
+ settled: The operation is complete and either fulfilled or rejected.

Once a promise is fulfilled or rejected, it is immutable.

#### Construct a Promise. 

The promise function is called with two arguments. the first one fullfills the promise and the second one rejects it.
{: .padding-top}

~~~ javascript
let promise = new Promise( function( fulfill, reject ){
    if ( /* statement */ ) {
        fulfill( 'Promise fulfilled' );   // Success
    } else {
        reject( 'Promise rejected' );  // Failure
    }
});
~~~

#### Use a Promise

You can use a promise with the `then` method which takes two arguments -- a callback for when fulfilled, and one for when rejected.

~~~ javascript
promise.then( function( result ){
    // Promise fulfilled
}, function( err ) {
    // Promise rejected
});
~~~

Let's emulate an async operation using setTimeout.
{: .padding-top}

~~~ javascript
function async( value ){
    return new Promise( function( fulfill, reject ){
         setTimeout( function(){
            if ( value >= 100 ) {
                fulfill( 'Promise fulfilled' );   // Success
            } else {
                reject( 'Promise rejected' );  // Failure - typically an Error object
            }
         }, 1000 );
    });
}

function onFulfill( data ){
    console.log( data );
}
 
function onReject( error ){
    console.log( error );
}

async(100).then( onFulfill, onReject );   // "Promise fulfilled"
async(30).then( onFulfill, onReject );    // "Promise rejected"
~~~

[More promises information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise){:target="_blank"}.
{: .padding-top}

### Classes

ES6 Classes only simulate class-like inheritance hierarchies using functions and prototypes. They don't really exist. They are syntactic sugar over existing Javascript prototypical inheritance. Classes are really just functions and make the code a little more readable.
{: .padding-top}

> **Important**: unlike function declarations, class declarations can’t be hoisted and an exception will be thrown.

#### Base class information

##### Definition
{: .padding-top}

~~~ javascript
class Hero {
    constructor( name, power ) {
        this._name = name;
        this._power = power;
    }
    name() {
        return this._name;
    }
    power() {
        return this._power;
    }
}

let hero = new Hero( "Wolverine", "Healing factor and claws" );

console.log( hero.name() );     // "Wolverine"
console.log( hero.power() );    // "Healing factor and claws"
~~~

##### Expressions
{: .padding-top}

A class expression is another way to define a class. Class expressions can be named (such as the example above) or unnamed. The name given to a named class expression is local to the class's body.

~~~ javascript
let Hero = class HeroClass {
    getClassName() {
        return HeroClass.name;
    }
}

let hero = new Hero();

console.log( hero.getClassName() );   // "HeroClass"
console.log( HeroClass );             // "ReferenceError: HeroClass is not defined
~~~

#### Class Body

##### Methods
{: .padding-top}

There are three types of methods in a class: constructor, static and prototype:

+ The constructor pseudo-method is the function that defines the class.
+ Static methods are defined using `static` and are properties specific to the class but are not inherited by instances of the class
+ Prototype methods are properties that are inherited by instances of the class

~~~ javascript
class Hero {
    // Constructor
    constructor( name ) {
        this._name = name;
    }

    // Static method
    static test() {
        return 123;
    }

    // Prototype method
    name() {
        return this._name;
    }
}

let hero = new Hero("Wolverine");

console.log( hero.name() );    // "Wolverine"
console.log( Hero.test() );    // 123

console.log( typeof Hero.prototype.name );    // function
console.log( typeof Hero.prototype.test );    // undefined
~~~

##### Subclasses
{: .padding-top}

The `extends` keyword is used to create a derived class from a base class.

~~~ javascript
class Hero {
    constructor( name, power ) {
        this._name = name;
        this._power = power;
    }
    name() {
        return "The hero's name is : " + this._name;
    }
    power() {
        return this._power;
    }
}

class Avenger extends Hero {
    name() {
        return "The Avenger's name is : " + this._name;
    }
}

let hero1 = new Hero( "Wolverine", "Healing factor and claws" );
let hero2 = new Avenger( "Hulk", "Super Strength" );

console.log( hero1.name() );     // "The hero's name is : Wolverine"
console.log( hero1.power() );    // "Healing factor and claws"

console.log( hero2.name() );     // "The Avenger's name is : Hulk"
console.log( hero2.power() );    // "Super Strength"
~~~

##### Super keyword
{: .padding-top}

The `super` keyword is used to call functions on an object's parent.

~~~ javascript
class Hero {
    constructor( name ) {
        this._name = name;
    }
    name() {
        return "The hero's name is " + this._name + ". ";
    }
}

class Avenger extends Hero {
    constructor( name ) {
        super( name.toUpperCase() );
    }
    name() {
        return super.name() + "He is an Avenger!";
    }
}

let hero = new Avenger( "Hulk" );
console.log( hero.name() );     // "The hero's name is HULK. He is an Avenger!"
~~~

##### Setters and Getters
{: .padding-top}

The syntax for getters and setters is just like in ECMAScript 5 object literals.

~~~ javascript
class Hero {
    constructor( name, power ) {
        this._name = name;
        this._power = power;
    }
    set name( name ) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set power(power) {
        this._power = power;
    }
    get power() {
        return this._power;
    }
}

let hero = new Hero( "Wolverine", "Healing factor and claws" );

console.log( hero.name );     // "Wolverine"
console.log( hero.power );    // "Healing factor and claws"
~~~

[More classes information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes){:target="_blank"}.
{: .padding-top}

### New Built-in Methods

#### Objects

`Object.assign` is a new function to assign enumerable properties of one or more source objects onto a destination object

> At the time of this writing, only Firefox has support for this. So if you're testing this example in jsbin, try it in Firefox.

~~~ javascript
let var1 = {};
let var2 = { a: 200, d: 10 };
let var3 = { b: 1, c: 2 };

Object.assign( var1, var2, var3 )
console.log( var1 ); // { a: 200, b: 1, c: 2, d: 10 }
~~~

#### Arrays

`find()` looks for an element in an array. It will return the first element it finds.

> At the time of this writing, only Firefox has support for this. So if you're testing this example in jsbin, try it in Firefox.

~~~ javascript
let search = [ 1, 3, 4, 2 ].find( x => x > 3 );
console.log( search );  // 4
~~~

#### Strings

`repeat()`  constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together. 

~~~ javascript
let test = "a"
console.log( test.repeat(5) );  // aaaaa
~~~

There are string functions to search for a substring. Each of these methods has a position as an optional second parameter, which specifies where the string to be searched starts or ends.
{: .padding-top}

~~~ javascript
console.log( "hello".startsWith("he") );    // true
console.log( "hello".endsWith("lo") );      // true

console.log( "hello".contains("es") );      // false

console.log( "hello".includes("he") );      // true
console.log( "hello".includes("he", 1) );   // false
console.log( "hello".includes("ell", 1) );  // true
console.log( "hello".includes("ell", 2) );  // false
~~~

`toArray()` creates an array containing each character of a string.
{: .padding-top}

~~~ javascript
console.log( "hello".toArray() )            // ["h", "e", "l", "l", "o"]
~~~

#### Numbers

~~~ javascript
console.log( Number.isInteger(1) );                     // true
console.log( Number.isInteger(1.2) );                   // false

console.log( Number.isNaN("test") );                    // false
console.log( Number.isNaN(NaN) );                       // true
console.log( Number.isNaN(0 / 0) );                     // true
console.log( Number.isNaN(undefined) );                 // false

console.log( Number.isFinite(NaN) );                    // false
console.log( Number.isFinite(123) );                    // true

console.log( Number.isSafeInteger(100) );               // true
console.log( Number.isSafeInteger(9999999999999999) );  // false

console.log( Math.cbrt(27) )                            // 3

console.log( Math.trunc(9.7) )                          // 9
console.log( Math.trunc( 0.1333) )                      // 0
console.log( Math.trunc(-10.133) )                      // -10
~~~

