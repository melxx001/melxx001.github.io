---
layout: posts
post-id: 2
showpost: false
comments: true
showcommentcount: false
date: 2015-05-25
img: fill-my-react-form.png
alt: Fill my react form
project-date: May 2015
sitename: Accessible React Forms
theurl: https://github.com/melxx001/react-accessible-form
category: Development
description: Coming Soon
title: Accessible React Forms
tags : [react, react.js, forms]
---

## Markdown Test

## h2

### h3

#### h4

##### h5

###### h6

~~~ javascript
function test(num){
	num = num  * 2;
	return num;
}
~~~

~~~ jsx
var Component = React.createClass({
	getInitialState: function(){
		return {
			value: 0
		};
	},
	increment: function(){
		this.setState({
			value: this.state.value + 1
		});
	},
	decrement: function(){
		this.setState({
			value: this.state.value - 1
		});
	},
	render: function(){
		return (
			<div>
				<div>{this.state.value}</div>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		);
	}
});

React.render(<Component />, document.getElementById('component'));
~~~

~~~ html
<div>
	<div>test</div>
	<span>test</span>
</div>
~~~
{: .language-html}

~~~ css
.style{
	margin: 25px auto 30px;
    padding: 0;
    max-width: 250px;
    border: 0;
    border-top: solid 5px;
    text-align: center;
}
~~~

### jsbin embed
<a class="jsbin-embed" target="_blank" href="http://jsbin.com/pabome/4/embed?js,output">React Example</a>

term
: definition
: another definition

new line 1

new line 2

new line 3

> 
block quote test block quote test 
block quote test block quote test 
block quote test block quote test 
block quote test block quote test 
block quote test block quote test 
block quote test block quote test


+ 1
+ 2
+ 3

* * *

- [Section1](#section1)  
- [Subsection1](#subsection1)
- [Subsection2](#subsection2)
- [Section2](#section2)
- [Section3](#section3)
- [Section4](#section4)

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

![alternate text](https://sourceforge.net/images/icon_linux.gif)

This is a huge header
==================

this is a smaller header
------------------

test ```test``` test

