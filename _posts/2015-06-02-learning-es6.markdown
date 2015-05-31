---
layout: posts
postid: 2015-06-02-1
published: false
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

## What is ES6?
{:.no_toc}

 So I'm trying to use ES6 and keepup with the times. I need to get up to speed quickly so I google it and read many docs. I figure to write about it here and have one location where I can reference what i've learn and actual examples that I can play with.


### Requirements
{:.no_toc}

+ install babel
+ ...
+ ...

### Features
{:.no_toc}

{:toc .postpage-scroll}
+ Features

#### Let and const

`
WRITE IN MY OWN WORDS: Block-scoped binding constructs. let is the new var. const is single-assignment. Static restrictions prevent use before assignment.
`

~~~ javascript
num = '10';
let num;

console.log( num );   // undefined
~~~
There is no hoisting for let and const because of the **temporal dead zone**. <-- WHAT IS THIS?

~~~ javascript
if ( true ) {
  let num = '10';
}

console.log( num );   // ReferenceError: num is not defined     
~~~
The keywords `let` and `const` create new variables scoped to the nearest block of code that is denoted by curly braces `{` and `}`. There is no identifier `num` outside that block scope, therefore calling unknown identifier throws an error.

~~~ javascript
const animals = [ 'dog' ];
animals.push( 'cat' );

console.log( animals );   // [ "dog", "cat" ]
~~~
The keyword `const` creates constant reference, not a constant value. The pointer that the variable name is using cannot change in memory, but the thing the variable points to might change.

[More let information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let){:target="_blank"} --
[More const information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const){:target="_blank"}.

#### Default parameters

I really like this feature as it will make intializing arguments much easier. 

~~~ javascript
function display( test = 'initial value' ){
  return test; 
}

console.log(display());               // "initial value"
console.log(display('new value'));    // "new value"
~~~

You can give function arguments initial values without having to do a check inside the function.


#### Template strings

`
WRITE IN MY OWN WORDS: Template strings provide syntactic sugar for constructing strings. This is similar to string interpolation features in Perl, Python and more. Optionally, a tag can be added to allow the string construction to be customized, avoiding injection attacks or constructing higher level data structures from string contents.
`

You have to put tildes around the expression. Ex: ` `expression` `

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

#### Object literal

`
WRITE IN MY OWN WORDS: Object literals are extended to support setting the prototype at construction, shorthand for foo: foo assignments, defining methods, making super calls, and computing property names with expressions.
`

~~~ javascript
let firstNname = 'Bob';
let lastname = 'Smith';

let person = {
  firstNname,
  lastname
};

console.log( person );   // { firstName: "Bob", lastname: "Smith" }

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

#### Arrows

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