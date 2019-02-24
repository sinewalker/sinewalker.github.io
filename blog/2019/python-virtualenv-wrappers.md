<!--
.. title: Python Virtualenv wrapper functions
.. slug: python-virtualenv-wrappers
.. date: 2019-02-24 07:39:54 UTC+11:00
.. tags: python, code, hax, bash, howto
.. category: 
.. link: 
.. description: Overview of my Python virtualenv-wrapper work-alike shell functions
.. type: text
-->

A while ago I noted that I should write about my shell functions for creating and managing Python Virtual Environments. Recently I was helping my boss set up some python virtual environments for some different projects, and I couldn't remember how to use [virtualenv](https://virtualenv.pypa.io/en/stable/) directly.

I *really wanted* to just share my wrappers with him, and I found that they weren't *quite* ready to share because I hadn't finished documenting them.

This post is to remedy that.

<!-- TEASER_END -->

----

I have a small collection of bash functions which I use for creating and managing Python Virtual Environments with `virtualenv`.  I keep them in my [dotfiles](https://github.com/sinewalker/dotfiles/tree/1.1.1).  Rather than make you clone my *entire* dotfiles set up, I have modularised it down to two files which you can source. They are:

 * [10_meta.sh](https://github.com/sinewalker/dotfiles/blob/1.1.1/source/10_meta.sh) (v1.1.1) - shell utility functions
 * [50_python.sh](https://github.com/sinewalker/dotfiles/blob/1.1.1/source/50_python.sh) (v1.1.1) - python utility functionts

To use these, download the scripts to a place where you keep shell functions:

```sh
cd path/to/your/shell/library
for X in 10_meta.sh 50_python.sh; do
  curl https://raw.githubusercontent.com/sinewalker/dotfiles/1.1.1/source/$X > $X
done
```

Then, load them into your bash like this (you can add this to your `.bashrc` somewhere so they are loaded whenever you start bash):

```sh
for X in path/to/your/shell/library; do
  source $X
done
```

Let's explore them.

# Make an environment

One of the most useful meta-functions that you just sourced from `10_meta.sh` is [describe](https://github.com/sinewalker/dotfiles/blob/1.1.1/source/10_meta.sh#L74), which I talk about more fully on [my post about Rule 6 - Doc Comments](/blog/2018/4-bits-part3.html).  

```sh
$ describe mkvenv 
Fn: mkvenv in ./50_python.sh line 60
    "Makes a Python Virtual env in ${VIRTUALENV_BASE}.";
```

That's interesting, all the python virtual environments will be created in `${VIRTUALENV_BASE}`.  What's this?  Well you can echo it out:

```sh
$ echo $VIRTUALENV_BASE
/Users/mjl/lib/python
```

It's actually set in `50_python.sh` on [line 53](https://github.com/sinewalker/dotfiles/blob/1.1.1/source/50_python.sh#L53) as the `python` sub-directory of your `${LIBRARY}` directory, if you have one, or of your `${HOME}/lib` directory if you don't.  The following line just makes sure you have that directory.  All the virtual environments will be created in this location.  

So `mkvenv` will create a virual environment for you:

```sh
$ mkvenv
Usage: mkvenv <venv> [virtualenv options]
Makes a Python Virtual env in /Users/mjl/lib/python.
$ mkvenv myvenv
New python executable in /Users/mjl/lib/python/myvenv/bin/python2.7
Also creating executable in /Users/mjl/lib/python/myvenv/bin/python
Installing setuptools, pip, wheel...done.
```

Oh, that made a virtualenv with my system-default Python 2.7.

What if I want Python 3?

Well it's easy, just pass along normal virtualenv arguments after the name of the environment:


```sh
$ mkvenv myvenv3 --python=python3
Running virtualenv with interpreter /usr/local/bin/python3
New python executable in /Users/mjl/lib/python/myvenv3/bin/python3.7
Also creating executable in /Users/mjl/lib/python/myvenv3/bin/python
Installing setuptools, pip, wheel...done.
```

Cool.  Let's use it.  

# Activate an environment

Activating an environment puts it in your shell `$PATH` and  adds it's name to your prompt, so you can tell that it's active.  This uses virtualenv activation scripts to do the work, just like normal:

```sh
$ activate myvenv3
(myvenv3)$
```

A nice thing about my `activate` is that you don't have to remember where you installed the environment and `source bin/activate` from there. Instead it is just found for you from the relevant environment in `${VIRTUALENV_BASE}`. Very handy.

# Listing environments


The `activate` function (and others) all use Bash TAB-completion, if you have that enabled. But maybe you're not sure what environments you have and need to see them all? Use `lsvenv` to list your environments:

```sh
(myenv3)$ lsvenv
edge-config
hax
jupyter
keras
myvenv
myvenv3
nikola
py27
sqlalchemy
te
```

Hmm, that `myvenv` is messy, I want to get rid of it.

# Removing environments

Use `rmvenv` to remove an environment:

```sh
(myenv3)$ rmvenv myvenv
Remove Venv: myvenv? [y/N] y
$
```

# Deactivating an environment

You can switch directly to another environment and `activate` will automatically deactivate the current one first.  But if you want to deactivate all of the virtualenv stuff *without* going to a different environment or ending your shell session, just use `deactivate` like normal:

```sh
(myvenv3)$ which python
/Users/mjl/lib/python/myvenv3/bin/python
(myvenv3)$ deactivate 
$ which python
/usr/local/bin/python
$ 
```


# Virtualenv alternative:  Anaconda

I also use [Anaconda Pyhton](https://www.anaconda.com/distribution/) a little bit, which has its own method for managing virtual environments with the `conda` tool.  But activation and deactivation is a but clunky.  So my `activate` and `deactivate` functions also work with Anaconda.

But now we have two *kinds* of Python virtual environments.  How is that handled?  Use `sucuri` (which is named after an Amazonian word for anaconda) to switch to Anaconda-mode. 

```sh
$ sucuri 
Anaconda: ACTIVATED 🐍
$
```

Yes, that's a UTF-8 character.  If your terminal doesn't handle that, my function takes care of you and uses ASCII instead.

>> Note that there's no other indication that Anaconda is active.  My [complicated bash prompt function](https://github.com/sinewalker/dotfiles/blob/1.1.1/source/20_prompt.sh) does give you some indication by adding a snake.  If you're interested, you can go down that rabit hole. I'll leave my prompts in place for the rest of this blog post.

Anyway, you can list your environments in the same way.  This time the conda environmens are listed instead of the virtualenv ones (using `conda info` &mdash; another thing you don't need to remember):

```sh
[mjl@milo:~/hax]
[08:32](🐍)β lsvenv 
snowflakes
root
[mjl@milo:~/hax]
[08:32](🐍)β
```

Activation is the same too:

```sh  
[mjl@milo:~/hax]
[08:32](🐍)β activate snowflakes 
[mjl@milo:~/hax]
[08:32](🐍-snowflakes)β which python
/Users/mjl/lib/anaconda/envs/snowflakes/bin/python
[mjl@milo:~/hax]
[08:32](🐍-snowflakes)β deactivate 
[mjl@milo:~/hax]
[08:32](🐍)β
```

In Anaconda-mode, you can use my `mkvenv` to make a conda environment, but I don't try to wrap all the special conda commands. Use `conda` if you want to do something more sophisticated, but for basic stuff, this is fine:

```sh
[mjl@milo:~/hax]
[08:35](🐍)β mkvenv anotherenv
mkvenv: Warning! Anaconda is active.
This wrapper will use conda to create anotherenv, but it is only very basic.
Fetching package metadata .........
Solving package specifications: 
Package plan for installation in environment /Users/mjl/lib/anaconda/envs/anotherenv:

Proceed ([y]/n)? 

#
# To activate this environment, use:
# > source activate anotherenv
#
# To deactivate this environment, use:
# > source deactivate anotherenv
#

[mjl@milo:~/hax]
[08:35](🐍)β
```

  (Don't "use source activate anotherenv" &hellip; pfft.  Just activate anotherenv.)

Here's the new environment:

```sh
[mjl@milo:~/hax]
[08:35](🐍)β lsvenv
anotherenv
snowflakes
root
```

Removing it *is* a bit tricky.  My `rmvenv` just gives up.  It does tell you how you *might* want to do it with `conda` though:

```sh
[mjl@milo:~/hax]
[08:36](🐍)β rmvenv anotherenv
rmvenv: Warning! Anaconda is active.
Consider using 'conda remove -all -n anotherenv' instead.
Aborting.
[mjl@milo:~/hax]
[08:36](🐍) 3 β 
```

At the end of your conda session, deactivate by running `sucuri` again:

```sh
[mjl@milo:~/hax]
[08:32](🐍)β sucuri 
Anaconda: deactivated
[mjl@milo:~/hax]
[08:32]β
```

That's all, I hope you find these wrappers simple and easy to use. No more fumbling with virtual environment setup and management.

Happy hacking.
