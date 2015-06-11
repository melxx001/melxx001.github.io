---
layout: posts
title: Move a git directory
tags: [git, learning, development]
published: true
category: Development
description: Move a git directory to another repository
img: dont-be-a-git-use-version-control.png
sitename: Git Directory Move
showcommentcount: true
comments: true
projectdate: 2015-06-10
theurl: 
url: 
date: 2015-06-10
alt: Move a git directory
postid: 2015-06-10-move-git-dir

---

I was working on a project, made some progress, commited a bunch of code into github and all was well. The code eventually needed to go into another repo so the painful merge adventure began... man... That took a bit of research.

I did what I do best and googled the hell out of it... There were lots of solutions but some of them weren't really clear to me or just didn't work. So after mindlessly trying out solutions, I realized I had to actually think of one.

## Table of contents

{:toc .postpage-scroll}
+ TOC


## What's the plan?

Take the contents of a repo and put it inside a particular folder in an existing repository and at the same time <span class="important">**preserve the history**</span>.

## Why did I write this?

In an effort to save myself some future research... And maybe someone else needs this info.

If you have a better solution, let me know!

## Let's do this!

### Set up your working directory

#### Clone repos

Set up a separate area and clone both the original repository `Orig` -- which contains the files you want to copy -- and the target repository `Dest`. This way, you can delete and restart if something goes wrong. **Don't push changes unless you're really sure**.

~~~ bash
$ mkdir TestFolder
$ cd TestFolder
$ git clone Orig.git
$ git clone Dest.git
~~~

#### Result
~~~ bash
|-- TestFolder
	|-- Orig
		|-- .git
		|-- .gitignore
		|-- File 
		|-- Dir 
	|-- Dest
		|-- .git
		|-- File
		|-- File
~~~


### Move everything into a directory

#### Create a new folder

Create a new folder -- in this example, I named it `temp` -- inside the repo `Orig` and move everything except the `.git` folder into it. Make sure that the folder name you choose doesn't exist in the root of the repo `Dest` to avoid issues and conflicts.

~~~ bash
$ cd /TestFolder/Orig
$ mkdir temp
$ mv !(temp) temp
$ mv .gitignore temp 	# Manually move files that are remaining
~~~

#### Result
~~~ bash
|-- TestFolder
	|-- Orig
		|-- .git
		|-- temp
			|-- .gitignore
			|-- File 
			|-- Dir
	|-- Dest
		|-- .git
		|-- File
		|-- File
~~~

### Prepare the code

Commit the code but <span class="important">**DO NOT PUSH!!!**</span> You don't want to modify the origin.

~~~ bash
$ git add -A .		# The next line doesn't commit if this line is not there
$ git commit -a -m "Moved all data into temp folder"
~~~

### Add a remote branch

Go to `Dest` and add `temp` as a remote branch.

~~~ bash
$ cd /TestFolder/Dest
$ git remote add temp /TestFolder/Orig
$ git fetch temp
~~~

### Merge the branch

Merge the remote branch into `Dest`. 

~~~ bash
$ git merge -m "Merging into repo Dest" temp/master
~~~

### Remove the temp branch

Remove the `temp` remote branch from `Repo Dest`. 

~~~ bash
$ git remote rm temp
~~~

### Check results

You should now have the folder `temp` in the root of `Repo Target`

~~~ bash
|-- TestFolder
	|-- Orig
		|-- .git
		|-- temp
			|-- .gitignore
			|-- File
			|-- Dir
	|-- Dest
		|-- .git
		|-- File
		|-- File
		|-- temp  	# This is the new folder
			|-- .gitignore
			|-- File
			|-- Dir
~~~

And... if you look at the git logs, you'll see that the history is there. Yay!

### Move to new location

Now, you can move the contents of `temp` anywhere in `Dest`. You're done! Commit and push!

